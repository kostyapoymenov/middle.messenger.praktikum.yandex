import type { IAppState, TListener } from './types';

const createStore = <T = Partial<IAppState>>(initialState: T = {} as T) => {
  let state: T = initialState;
  const listeners = new Set<TListener<T>>();

  return {
    getState(): T {
      return state;
    },

    setState(newState: Partial<T>): void {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener(state));
    },

    subscribe(listener: TListener<T>): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export default createStore;
