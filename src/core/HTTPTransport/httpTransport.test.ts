import { expect } from 'chai';
import HTTPTransport from './index.ts';
import { queryStringify } from './utils.ts';
import type { TQueryParams } from './types.ts';

describe('HTTPTransport', () => {
  const mockApiUrl = 'https://api.example.com';
  let httpTransport: HTTPTransport;

  beforeEach(() => {
    httpTransport = new HTTPTransport(mockApiUrl);
  });

  describe('constructor', () => {
    it('should create instance with all HTTP methods', () => {
      expect(httpTransport).to.exist;
      expect(typeof httpTransport.get).to.equal('function');
      expect(typeof httpTransport.post).to.equal('function');
      expect(typeof httpTransport.put).to.equal('function');
      expect(typeof httpTransport.patch).to.equal('function');
      expect(typeof httpTransport.delete).to.equal('function');
    });
  });

  describe('HTTP methods', () => {
    it('should return Promise from get method', async () => {
      const result = httpTransport.get('test');
      expect(result).to.be.instanceOf(Promise);
    });

    it('should return Promise from post method', async () => {
      const result = httpTransport.post('test', { data: { name: 'test' } });
      expect(result).to.be.instanceOf(Promise);
    });

    ['put', 'patch', 'delete'].forEach((method) => {
      it(`should return Promise from ${method} method`, async () => {
        const testData = { test: 'data' };

        // приватный метод
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (httpTransport as any)[method]('test', {
          data: testData,
        });
        expect(result).to.be.instanceOf(Promise);
      });
    });
  });

  describe('options handling', () => {
    it('should accept headers option', async () => {
      const headers = { Authorization: 'Bearer token' };
      const result = httpTransport.get('test', { headers });
      expect(result).to.be.instanceOf(Promise);
    });
  });
});

describe('HTTPTransport utils', () => {
  describe('queryStringify', () => {
    it('should stringify simple object', () => {
      const data: TQueryParams = { id: 1, name: 'test' };
      const result = queryStringify(data);
      expect(result).to.equal('?id=1&name=test');
    });

    it('should handle boolean values', () => {
      const data: TQueryParams = { active: true, enabled: false };
      const result = queryStringify(data);
      expect(result).to.equal('?active=true&enabled=false');
    });

    it('should handle nested objects (basic)', () => {
      const data = { tags: ['a', 'b'] } as any;
      const result = queryStringify(data);
      expect(result).to.include('tags=a,b');
    });
  });
});
