import { backendClient } from "@/lib/axios";

const queryKey = "message";

const createMessageMutationKey = "create-message";

type Message = {
  id: string;
  content: string;
  agent: "USER" | "CHATBOT";
};

const getMessages = async (chatId: string) => {
  const { data } = await backendClient.get<Message[]>(
    `/api/chat/${chatId}/message`
  );
  return data;
};

const createMessage = (chatId: string) => async (content: string) => {
  const { data } = await backendClient.post<Message>(
    `/api/chat/${chatId}/message`,
    { content, agent: "USER" }
  );
  return data;
};

export const messageService = {
  queryKey,
  createMessageMutationKey,
  getMessages,
  createMessage,
};
