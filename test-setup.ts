import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

const globalRecord = globalThis as Record<string, unknown>;
globalRecord.window = dom.window;
globalRecord.document = dom.window.document;
globalRecord.HTMLElement = dom.window.HTMLElement;

Object.defineProperty(globalRecord, 'navigator', {
  configurable: true,
  enumerable: true,
  get: () => dom.window.navigator,
});

Object.defineProperty(globalRecord, 'customElements', {
  configurable: true,
  enumerable: true,
  get: () => dom.window.customElements,
});

Object.keys(dom.window).forEach((key) => {
  if (
    !(key in globalRecord) &&
    key !== 'navigator' &&
    key !== 'customElements'
  ) {
    globalRecord[key] = (dom.window as Record<string, unknown>)[key];
  }
});
