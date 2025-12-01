import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import Link from '../../components/link';
import { ROUTES } from '../../constants/routes';

class GoToChats extends Block {
  constructor() {
    const chatsLink = new Link({
      text: 'Назад к чатам',
      events: {
        click: (event): void => {
          event.preventDefault();
          window.router.go(ROUTES.chats);
        },
      },
    });
    super('div', { className: 'goToChats', chatsLink });
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default GoToChats;
