import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';

interface IModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

class Modal extends Block {
  constructor(props: IModalProps) {
    super('div', {
      ...props,
      className: 'modal',
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
            props.onClose();
          }
        },
      },
    });
  }

  componentDidUpdate(): boolean {
    if (this.meta.props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default Modal;
