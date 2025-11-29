import { CHATS_API } from '../../api/chats';
import { API_WS_URL } from '../../env';
import WsClient from '../../core/wsClient';
import type { IChat } from '../../models/chat';
import type { IMessage } from '../../models/message';
import type { IUser } from '../../models/user';

export const initWs = async (
  chatId: IChat['id']
): Promise<{
  sendMessage?: (message: string) => void;
  disconnect?: () => void;
}> => {
  const { getState, setState } = window.store;
  const { chats, user } = getState();

  const selectedChat = chats?.find((chat) => chat.id === chatId);

  const selectedChatUsers = (await CHATS_API.getChatUsers(chatId)) as IUser[];

  const { token } = await CHATS_API.getToken(chatId);
  const endpoint = `${API_WS_URL}/${user!.id}/${chatId}/${token}`;

  setState({ selectedChat: undefined, selectedChatUsers: [], messages: [] });
  const wsClient = new WsClient<IMessage | IMessage[]>(endpoint);

  wsClient.createConnection((data) => {
    const { messages } = getState();
    const newMessages = (Array.isArray(data) ? data : [data]).filter(
      (message) => message.type !== 'user connected'
    );
    setState({
      selectedChat,
      selectedChatUsers,
      messages: [...newMessages, ...(messages ?? [])],
    });
  });

  const sendMessage = (message: string): void => {
    wsClient.sendMessage(message);
  };

  const disconnect = () => {
    wsClient.closeConnection();
  };

  return { sendMessage, disconnect };
};
