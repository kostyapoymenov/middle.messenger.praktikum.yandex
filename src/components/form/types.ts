import type { IFormFieldProps } from '../formField/types';
import type { IButtonProps } from '../button/types';

export interface IFromProps {
  classNames: string;
  submitButton: Partial<IButtonProps>;
  events: Record<string, (e: Event | InputEvent) => void>;
  fields: Partial<IFormFieldProps>[];
}
