import type { IMessage } from './message';
import type { Nullable } from './shared';

export interface IChat {
  id: number;
  title: string;
  avatar: Nullable<string>;
  unread_count: number;
  created_by: string;
  last_message: Nullable<IMessage>;
}
