import type Router from '../src/core/router';
import createStore from '../src/core/store';
import type { IAppState } from '../src/core/store/types';

declare global {
  interface Window {
    router: Router;
    store: ReturnType<typeof createStore<Partial<IAppState>>>;
  }
}
