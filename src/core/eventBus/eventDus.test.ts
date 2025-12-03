import { expect } from 'chai';
import EventBus from './index.ts';
import type { EventBusCallback } from './types.ts';

describe('EventBus', () => {
  let eventBus: EventBus;
  const testEvent = 'test:event';

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('on', () => {
    it('should subscribe callback to event', () => {
      const mockCallback: EventBusCallback = () => {};

      eventBus.on(testEvent, mockCallback);

      expect(() => eventBus.emit(testEvent)).to.not.throw();
    });
  });

  describe('emit', () => {
    it('should call subscribed callbacks without arguments', () => {
      let called = false;
      const callback: EventBusCallback = () => {
        called = true;
      };

      eventBus.on(testEvent, callback);
      eventBus.emit(testEvent);

      expect(called).to.be.true;
    });

    it('should pass arguments to callbacks', () => {
      let receivedNumber: number | undefined;
      let receivedString: string | undefined;

      const callback: EventBusCallback = (...args: unknown[]) => {
        receivedNumber = args[0] as number;
        receivedString = args[1] as string;
      };

      eventBus.on(testEvent, callback);
      eventBus.emit(testEvent, 42, 'test');

      expect(receivedNumber).to.equal(42);
      expect(receivedString).to.equal('test');
    });

    it('should throw error for non-existing event', () => {
      expect(() => eventBus.emit('nonexistent')).to.throw(
        'Нет события: nonexistent'
      );
    });
  });

  describe('off', () => {
    it('should unsubscribe callback from event', () => {
      let called = false;
      const callback: EventBusCallback = () => {
        called = true;
      };

      eventBus.on(testEvent, callback);
      eventBus.off(testEvent, callback);

      eventBus.emit(testEvent);
      expect(called).to.be.false;
    });

    it('should throw error when unsubscribing from non-existing event', () => {
      const callback: EventBusCallback = () => {};
      expect(() => eventBus.off('nonexistent', callback)).to.throw(
        'Нет события: nonexistent'
      );
    });
  });

  describe('multiple listeners', () => {
    it('should call all subscribed callbacks', () => {
      let firstCalled = false;
      let secondCalled = false;

      const firstCallback: EventBusCallback = () => {
        firstCalled = true;
      };

      const secondCallback: EventBusCallback = () => {
        secondCalled = true;
      };

      eventBus.on(testEvent, firstCallback);
      eventBus.on(testEvent, secondCallback);
      eventBus.emit(testEvent);

      expect(firstCalled).to.be.true;
      expect(secondCalled).to.be.true;
    });
  });
});
