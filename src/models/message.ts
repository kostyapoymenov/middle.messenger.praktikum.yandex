export type IMessage = {
  id?: string;
  chat_id?: number;
  user_id?: number;
  time: string;
  content: string;
  type?: string;
  userName?: string;
};
