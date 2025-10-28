export interface IButtonProps {
  text: string;
  events: Record<string, (e: Event) => void>;
  type: 'button' | 'submit' | 'reset';
  icon: string;
}
