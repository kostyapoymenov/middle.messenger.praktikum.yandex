import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IInputProps } from './types';

class Input extends Block {
  validationFn;
  error?: string;

  constructor(props: Partial<IInputProps> = {}) {
    super('input', {
      ...props,
      events: {
        blur: () => this.validate(props.onValidate),
        submit: () => alert('submit'),
      },
      className: 'input',
      attrs: {
        name: props.name,
        value: props.value,
        type: props.type ?? 'text',
        placeholder: props.placeholder,
      },
    });

    if (props.validationFn) {
      this.validationFn = props.validationFn;
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }

  validate(callback?: (err?: string) => void): void {
    if (this.validationFn) {
      this.error = this.validationFn((this.element as HTMLInputElement)?.value);
      callback?.(this.error);
    }
  }
}

export default Input;
