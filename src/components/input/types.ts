export interface IInputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'phone';
  placeholder: string;
  events: Record<string, (e: Event | InputEvent) => void>;
  validationFn?: (value: string) => string | undefined;
  error: string;
  onValidate: (err?: string) => void;
}
