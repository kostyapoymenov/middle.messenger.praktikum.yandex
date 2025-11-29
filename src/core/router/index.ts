import { ROUTES } from '../../constants/routes';
import type Block from '../block';
import type { RouteProps } from './types';

class Route {
  #pathname: string;
  #blockClass: typeof Block;
  #block: Block | null;
  #props: RouteProps;
  #componentProps?: Record<string, unknown>;

  constructor(
    pathname: string,
    view: typeof Block,
    props: RouteProps,
    componentProps?: Record<string, unknown>
  ) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#block = null;
    this.#props = props;
    this.#componentProps = componentProps;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this.#block && this.#block.getContent()) {
      this.#block.getContent().remove();
    }
  }

  match(pathname: string) {
    return pathname === this.#pathname;
  }

  render() {
    if (!this.#block) {
      this.#block = new this.#blockClass(this.#componentProps);
    }
    const root = document.querySelector(this.#props.rootQuery);
    if (root && this.#block.getContent()) {
      root.innerHTML = '';
      root.appendChild(this.#block.getContent());
    }
  }
}

class Router {
  static #instance: Router;

  #routes: Route[] = [];
  #history: History = window.history;
  #currentRoute: Route | null = null;
  #rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.#instance) {
      return Router.#instance;
    }
    this.#rootQuery = rootQuery;
    Router.#instance = this;
  }

  use(
    pathname: string,
    block: typeof Block,
    componentProps?: Record<string, unknown>
  ) {
    const route = new Route(
      pathname,
      block,
      { rootQuery: this.#rootQuery },
      componentProps
    );
    this.#routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => this.#onRoute(window.location.pathname);
    this.#onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.#history.pushState({}, '', pathname);
    this.#onRoute(pathname);
  }

  back() {
    this.#history.back();
  }

  forward() {
    this.#history.forward();
  }

  getRoute(pathname: string) {
    return this.#routes.find((route) => route.match(pathname));
  }

  #onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      const notFoundRoute = this.getRoute(ROUTES.notFound);
      if (notFoundRoute) {
        this.#history.replaceState({}, '', ROUTES.notFound);
        if (this.#currentRoute) {
          this.#currentRoute.leave();
        }
        this.#currentRoute = notFoundRoute;
        notFoundRoute.render();
      }
      return;
    }
    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }
    this.#currentRoute = route;
    route.render();
  }
}

export default Router;
