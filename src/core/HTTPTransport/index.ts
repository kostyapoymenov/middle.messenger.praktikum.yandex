import {
  type IRequestOptions,
  type THttpRequest,
  type TQueryParams,
  type HttpMethod,
  HttpMethods,
} from './types';
import { queryStringify } from './utils';

class HTTPTransport {
  #apiUrl: string;

  constructor(apiUrl: string) {
    this.#apiUrl = apiUrl;
  }

  get = this.#createMethod(HttpMethods.Get);
  post = this.#createMethod(HttpMethods.Post);
  put = this.#createMethod(HttpMethods.Put);
  patch = this.#createMethod(HttpMethods.Patch);
  delete = this.#createMethod(HttpMethods.Delete);

  #createMethod(method: HttpMethod): THttpRequest {
    return (url, options = {}) =>
      this.#request(`${this.#apiUrl}/${url}`, {
        ...(options as IRequestOptions<TQueryParams>),
        method,
      });
  }

  #request<R>(url: string, options: IRequestOptions<TQueryParams>): Promise<R> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, headers, timeout } = options;

      if (method === HttpMethods.Get && data) {
        url += queryStringify(data);
      }

      xhr.open(method, url);
      xhr.withCredentials = true;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;
      xhr.ontimeout = (): void =>
        reject(new Error(`Request timed out after ${timeout}ms`));
      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.response);
          return;
        }

        try {
          resolve(JSON.parse(xhr.response));
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          resolve(xhr.response);
        }
      };
      xhr.onerror = (): void => reject(new Error('Network error'));

      if (method !== HttpMethods.Get && data) {
        if (data instanceof FormData) {
          xhr.send(data);
        } else if (typeof data === 'object' && !headers?.['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send(data as XMLHttpRequestBodyInit);
        }
      } else {
        xhr.send();
      }
    });
  }
}

export default HTTPTransport;
