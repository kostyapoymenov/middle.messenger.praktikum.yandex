import Link from '../link';
import type { INavigationProps } from './types';

export const prepareLinks = ({ routes, outlet }: Partial<INavigationProps>): Link[] => {
  if (!outlet || !routes) {
    return [];
  }

  console.log(routes);
  return Object.values(routes).map(
    (route) =>
      new Link({
        text: route.name,
        events: {
          click: (event): void => {
            event.preventDefault();
            outlet.innerHTML = '';
            outlet.appendChild(route.component.getElement() as Node);
          },
        },
      })
  );
};
