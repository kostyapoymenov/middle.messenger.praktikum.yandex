export interface ILinkProps {
  text: string;
  events: Record<string, (e: Event) => void>;
  href: string;
}
