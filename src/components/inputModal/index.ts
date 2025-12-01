import Block from '../../core/block';
import template from './template.hbs?raw';
import Input from '../input';
import Button from '../button';
import './styles.scss';

interface IInputModalProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  submitText: string;
  cancelText?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
  validationFn?: (value: string) => string;
  [key: string]: unknown;
}

class InputModal extends Block {
  private input?: Input;

  constructor(props: IInputModalProps) {
    const input = new Input({
      name: 'modal-input',
      placeholder: props.placeholder,
      onValidate: (error?: string) => {
        if (error) {
          console.log('Validation error:', error);
        }
      },
      validationFn: props.validationFn,
    });

    const submitButton = new Button({
      text: props.submitText,
      type: 'button',
      events: {
        click: () => this.handleSubmit(),
      },
    });

    const cancelButton = new Button({
      text: props.cancelText || 'Отмена',
      type: 'button',
      events: {
        click: () => this.handleClose(),
      },
    });

    super('div', {
      ...props,
      input,
      submitButton,
      cancelButton,
      className: 'input-modal',
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('modal-overlay')) {
            this.handleClose();
          }
        },
      },
    });

    this.input = input;
  }

  private getModalProps(): IInputModalProps {
    return this.meta.props as unknown as IInputModalProps;
  }

  private handleClose() {
    const props = this.getModalProps();
    props.onClose();
  }

  private handleSubmit() {
    if (!this.input) return;

    const inputElement = this.input.getElement() as HTMLInputElement;
    const value = inputElement.value;

    if (this.input.validationFn) {
      const error = this.input.validationFn(value);
      if (error) {
        console.log('Validation error:', error);
        return;
      }
    }

    if (value.trim()) {
      const props = this.getModalProps();
      props.onSubmit(value.trim());
      this.handleClose();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(e: KeyboardEvent) {
    const props = this.getModalProps();
    if (props.isOpen && e.key === 'Escape') {
      this.handleClose();
    }
  }

  componentDidUpdate(): boolean {
    const props = this.getModalProps();

    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const inputElement = this.input?.getElement() as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.select();
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return true;
  }

  render(): DocumentFragment {
    const props = this.getModalProps();
    const modalClass = props.isOpen ? 'modal-open' : '';
    return this.compile(template, {
      ...props,
      modalClass,
    });
  }
}

export default InputModal;
