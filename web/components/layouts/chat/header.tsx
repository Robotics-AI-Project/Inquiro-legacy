"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useHover } from "usehooks-ts";
import React, { createRef, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Chat, chatService } from "@/services/chat.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  chatId?: string;
};

const Header = ({ chatId }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { toast } = useToast();

  const headerContentRef = createRef<HTMLDivElement>();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const isHovered = useHover(headerContentRef);

  const editIconAppear = chatId && (isHovered || isFocused);

  const queryClient = useQueryClient();

  const chatQueryKey = [chatService.queryKey, chatId];
  const { data, isFetchedAfterMount, isLoading } = useQuery({
    queryKey: chatQueryKey,
    queryFn: chatService.getChatById(chatId!),
    enabled: !!chatId,
  });

  const { mutateAsync: updateChatAsyncMutation } = useMutation({
    mutationKey: [chatService.updateChatMutationKey, chatId],
    mutationFn: chatService.updateChat(chatId!),
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries({
        queryKey: chatQueryKey,
      });

      const previousTitle = queryClient.getQueryData(chatQueryKey);

      queryClient.setQueryData(chatQueryKey, newTitle);

      return { previousTitle, newTitle };
    },
    onError: (err, newTitle, context) => {
      console.log("error ja", (context?.previousTitle as unknown as any).name);
      queryClient.setQueryData(
        chatQueryKey,
        (context?.previousTitle as unknown as any).name
      );
    },
    onSettled: () => {
      const title = titleRef.current?.innerText;
      if (!chatId || !title) return;
      queryClient.setQueryData<Chat[]>([chatService.queryKey], (prevChat) => {
        return prevChat?.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              name: title,
            };
          }
          return chat;
        });
      });
    },
  });

  const onBlur = async () => {
    const title = titleRef.current?.innerText;
    if (!chatId || !title) return;
    try {
      await updateChatAsyncMutation(title);
      toast({
        title: "Chat title updated",
      });
    } catch (err) {
      toast({
        title: "Uh oh, something went wrong",
        description: "Could not update chat title",
        variant: "destructive",
      });
      console.log(err);
    }
    setIsFocused(false);
  };

  const title = useMemo(() => {
    if (!chatId || !isFetchedAfterMount) return "";
    return data?.name;
  }, [chatId, isFetchedAfterMount]);

  return (
    <div className="flex flex-grow-0 flex-shrink-0 h-24 justify-center items-center border-b-4 border-border">
      <div ref={headerContentRef} className="flex space-x-3 items-center">
        {isLoading ? (
          <Skeleton className="w-40 h-10" />
        ) : (
          <motion.h1
            ref={titleRef}
            className={cn(
              "border-0 ring-0 ring-offset-0 text-2xl font-bold rounded-md px-4 py-2 transition-all duration-100",
              chatId &&
                "hover:border-2 hover:border-gray-200 focus:outline-gray-200"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlur}
            contentEditable={!!chatId}
            suppressContentEditableWarning
          >
            {title}
          </motion.h1>
        )}

        <AnimatePresence>
          {editIconAppear && (
            <motion.div
              initial={{ x: -10, opacity: 0, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "max-content" }}
              exit={{ x: 10, opacity: 0, width: 0 }}
              transition={{
                duration: 0.2,
              }}
            >
              <Edit className="h-4 w-4 text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
