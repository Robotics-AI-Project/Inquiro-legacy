"use client";
import Footer from "@/components/layouts/chat/footer";
import Header from "@/components/layouts/chat/header";
import { chatService } from "@/services/chat.service";
import { messageService } from "@/services/message.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chatId: string };
}) {
  const { chatId } = params;
  const queryClient = useQueryClient();

  const messageQueryKey = [messageService.queryKey, chatId];

  const { mutateAsync: createMessageAsyncMutation } = useMutation({
    mutationFn: messageService.createMessage(chatId),
    mutationKey: [messageService.createMessageMutationKey, chatId],
    onMutate: async (message) => {
      const newMessage = {
        content: message,
        agent: "USER",
      };
      await queryClient.cancelQueries({
        queryKey: messageQueryKey,
      });

      const previousMessages = queryClient.getQueryData(
        messageQueryKey
      ) as unknown[];
      const currentMessages = [...previousMessages, newMessage];

      queryClient.setQueryData(messageQueryKey, currentMessages);
      return { previousMessages, currentMessages };
    },
    onError: (err, newMessages, context) => {
      queryClient.setQueryData(messageQueryKey, context?.previousMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: messageQueryKey,
      });
    },
  });

  return (
    <div className="flex flex-col h-full w-full">
      <Header chatId={chatId} />
      <div className="flex flex-auto flex-col-reverse overflow-scroll">
        {children}
      </div>
      <Footer onSubmit={createMessageAsyncMutation} />
    </div>
  );
}
