import {
  type IRequestOptions,
  type THttpRequest,
  type TQueryParams,
  type HttpMethod,
  HttpMethods,
} from './types';
import { queryStringify } from './utils';

class HTTPTransport {
  get = this.#createMethod(HttpMethods.Get);
  post = this.#createMethod(HttpMethods.Post);
  put = this.#createMethod(HttpMethods.Put);
  patch = this.#createMethod(HttpMethods.Patch);
  delete = this.#createMethod(HttpMethods.Delete);

  #createMethod(method: HttpMethod): THttpRequest {
    return (url, options = {}) =>
      this.#request(url, { ...(options as IRequestOptions<TQueryParams>), method });
  }

  #request<R>(url: string, options: IRequestOptions<TQueryParams>): Promise<R> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, headers, timeout } = options;

      if (method === HttpMethods.Get && data) {
        url += queryStringify(data);
      }

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;
      xhr.ontimeout = (): void => reject(new Error(`Request timed out after ${timeout}ms`));
      xhr.onload = (): void => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      };
      xhr.onerror = (): void => reject(new Error('Network error'));

      if (method !== HttpMethods.Get && data) {
        let body = data;
        if (typeof data === 'object' && !headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          body = JSON.stringify(data);
        }
        xhr.send(body);
      } else {
        xhr.send();
      }
    });
  }
}

export default HTTPTransport;
