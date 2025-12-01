import './base.scss';

import { ROUTES, ROUTES_MAPPING, UNATHORIZE_ROUTES } from './constants/routes';
import type Block from './core/block';
import Router from './core/router';
import createStore from './core/store';
import { STORE_DEFAULT_STATE } from './core/store/const';
import { fetchMe } from './services/auth';

window.router = new Router('#app');
window.store = createStore(STORE_DEFAULT_STATE);

Object.values(ROUTES_MAPPING).forEach(({ pathname, component, props }) =>
  window.router.use(pathname, component as typeof Block, props)
);

const init = async () => {
  const user = await fetchMe();
  if (user && UNATHORIZE_ROUTES.includes(window.location.pathname)) {
    window.router.go(ROUTES.chats);
  }

  if (!user) {
    window.router.go(ROUTES.logIn);
  }

  window.router.start();
};

init();
