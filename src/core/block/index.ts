import EventBus from '../eventBus/index.ts';
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import {
  type TBlockChildren,
  type IBlockMeta,
  type IBlockProps,
  BlockEvents,
} from './types.ts';

const test: string = 123;

class Block<T extends Partial<IBlockProps> = Partial<IBlockProps>> {
  protected meta: IBlockMeta;
  protected element: HTMLElement | null = null;
  protected eventBus: EventBus;
  protected id: string;

  children: TBlockChildren<Block> = {};

  constructor(tagName = 'div', propsAndChildren: T = {} as T) {
    this.eventBus = new EventBus();
    this.id = makeUUID();
    const { props, children } = this.#getChildren(propsAndChildren);
    this.children = children;
    this.meta = {
      tagName,
      props: this.#makePropsProxy({ ...props, id: this.id }),
    };
    this.#registerEvents();
    this.eventBus.emit(BlockEvents.init);
  }

  public getId(): string {
    return this.id;
  }

  #registerEvents(): void {
    this.eventBus.on(BlockEvents.init, this.#init.bind(this));
    this.eventBus.on(BlockEvents.flowCdm, this.#componentDidMount.bind(this));
    this.eventBus.on(BlockEvents.flowRender, this.#render.bind(this));
  }

  #init(): void {
    this.#createResources();
    this.eventBus.emit(BlockEvents.flowRender);
  }

  init(): void {
    this.#init();
  }

  #createResources(): void {
    const { tagName, props } = this.meta;
    const element = document.createElement(tagName);
    if (typeof props.className === 'string') {
      const classes = props.className.split(' ').filter(Boolean);
      if (classes.length) element.classList.add(...classes);
    }
    if (typeof props.attrs === 'object' && props.attrs !== null) {
      Object.entries(props.attrs).forEach(([attr, value]) => {
        if (typeof value === 'string') {
          element.setAttribute(attr, value);
        }
      });
    }
    this.element = element;
  }

  #render(): void {
    if (!this.element) {
      throw new Error('Element is not created');
    }
    const newElement = this.render();
    if (this.element.children.length === 0) {
      this.element.appendChild(newElement);
    } else {
      this.element.replaceChildren(newElement);
    }
    this.#removeEventListeners();
    this.#addEventListeners();
  }

  #componentUpdate(oldProps: IBlockProps): void {
    const newProps = this.meta.props;
    if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      if (typeof this.shouldComponentUpdate === 'function') {
        if (!this.shouldComponentUpdate()) {
          return;
        }
      }
      if (this.componentDidUpdate()) {
        this.eventBus.emit(BlockEvents.flowRender);
      }
    }
  }

  #getChildren(propsAndChildren: IBlockProps): {
    children: TBlockChildren<Block>;
    props: IBlockProps;
  } {
    const children: TBlockChildren<Block> = {};
    const props: IBlockProps = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  #componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  #makePropsProxy(props: IBlockProps): IBlockProps {
    return new Proxy(props, {
      set: (target, prop, value): boolean => {
        const oldProps = { ...target };
        target[prop as keyof typeof target] = value;
        this.#componentUpdate(oldProps);
        return true;
      },
    });
  }

  #addEventListeners(): void {
    const { events = {} } = this.meta.props;
    Object.keys(events).forEach((eventName) => {
      if (this.element) {
        this.element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  #removeEventListeners(): void {
    const { events = {} } = this.meta.props;
    Object.keys(events).forEach((eventName) => {
      if (this.element) {
        this.element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  protected compile(
    template: string,
    props: Record<string, unknown> = {}
  ): DocumentFragment {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => `<div data-id="${component.id}"></div>`)
          .join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });
    const fragment = this.#createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component.id}"]`
          );
          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        stub?.replaceWith(child.getContent());
      }
    });
    return fragment.content;
  }

  #createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus.emit(BlockEvents.flowCdm);
  }

  componentDidUpdate(): boolean {
    return true;
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getElement(): HTMLElement | null {
    if (!this.element) {
      this.#render();
    }
    return this.element;
  }

  setProps(nextProps: IBlockProps): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this.meta.props, nextProps);
  }
}

export default Block;
