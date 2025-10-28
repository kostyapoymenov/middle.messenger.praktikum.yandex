import type { IRoute } from '../../constants/routes';

export interface INavigationProps {
  routes: IRoute[];
  outlet: HTMLElement | null;
}
