import { backendClient } from "@/lib/axios";

const queryKey = "chat";
const createChatMutationKey = "create-chat";
const updateChatMutationKey = "update-chat";

export type Chat = {
  id: string;
  name: string;
  createdAt: string;
};

const getChatList = async () => {
  const { data } = await backendClient.get<Chat[]>("/api/chat");
  return data;
};

const getChatById = (chatId: string) => async () => {
  const { data } = await backendClient.get<Chat>(`/api/chat/${chatId}`);
  return data;
};

const createChat = async (message: string) => {
  const { data } = await backendClient.post<Chat>("/api/chat", { message });
  return data;
};

const updateChat = (chatId: string) => async (name: string) => {
  const { data } = await backendClient.patch<Chat>(`/api/chat/${chatId}`, {
    name,
  });
  return data;
};

export const chatService = {
  queryKey,
  createChatMutationKey,
  updateChatMutationKey,
  getChatList,
  getChatById,
  createChat,
  updateChat,
};
