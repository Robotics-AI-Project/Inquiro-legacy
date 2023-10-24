import { backendClient } from "@/lib/axios";
import { paths } from "@/types/openapi";

const queryKey = "message";

const createMessageMutationKey = "create-message";

type Message =
  paths["/api/chat/{chat_id}/message/"]["post"]["responses"][200]["content"]["application/json"];

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
