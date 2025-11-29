import { CHATS_API } from '../../api/chats';
import { USER_API } from '../../api/user';
import { withTryCatch } from '../../core/errorHandler';
import type { IChat } from '../../models/chat';
import type { IUser } from '../../models/user';

export const fetchChats = async () => {
  const { store } = window;
  const [chats] = await withTryCatch<IChat[]>(CHATS_API.getChats());
  if (chats) {
    store.setState({ chats });
  }
};

export const createChat = async (title: IChat['title']) => {
  const [isCreated] = await withTryCatch(CHATS_API.createChat({ title }));
  if (isCreated) {
    await fetchChats();
  }
};

export const addUserToChat = async (login: string, chatId: IChat['id']) => {
  const [users] = await withTryCatch<IUser[]>(USER_API.searchUsers(login));
  if (users?.length) {
    const [isAdded] = await withTryCatch(
      CHATS_API.addUsersToChat({ chatId, users: users.map((user) => user.id) })
    );

    if (isAdded) {
      const { setState, getState } = window.store;
      const { selectedChatUsers } = getState();
      setState({ selectedChatUsers: [...(selectedChatUsers || []), ...users] });
    }
  }
};

export const deleteUserFromChat = async (
  userId: IUser['id'],
  chatId: IChat['id']
) => {
  const [isDeleted] = await withTryCatch(
    CHATS_API.deleteUsersFromChat({ users: [userId], chatId })
  );
  if (isDeleted) {
    const { setState, getState } = window.store;
    const { selectedChatUsers } = getState();
    setState({
      selectedChatUsers: selectedChatUsers?.filter(
        (user) => user.id !== userId
      ),
    });
  }
};
