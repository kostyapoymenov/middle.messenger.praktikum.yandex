import type { EventBusCallback } from './types';

class EventBus {
  #listeners: Record<string, EventBusCallback[]>;

  constructor() {
    this.#listeners = {};
  }

  on(event: string, callback: EventBusCallback): void {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(callback);
  }

  off(event: string, callback: EventBusCallback): void {
    if (!this.#listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.#listeners[event] = this.#listeners[event].filter((listener) => listener !== callback);
  }

  emit<T extends unknown[] = []>(event: string, ...args: T): void {
    if (!this.#listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.#listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
