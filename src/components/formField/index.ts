import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import Input from '../input';
import type { IFormFieldProps } from './types';

class FormField extends Block {
  constructor(props: Partial<IFormFieldProps>) {
    const inputField = new Input({
      name: props.name,
      type: props.type,
      placeholder: props.placeholder,
      events: props.events,
      validationFn: props.validationFn,
      onValidate: (err) => this.setProps({ error: err }),
    });
    super('label', {
      label: props.label,
      className: 'input-group',
      inputField,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default FormField;
