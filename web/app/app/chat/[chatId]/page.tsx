"use client";

import { useIsVisible } from "@/app/hooks/use-is-visible";
import Message from "@/components/layouts/chat/message";
import { messageService } from "@/services/message.service";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Fragment, createRef, useEffect } from "react";

export default function Chat({ params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const messageEndRef = createRef<HTMLDivElement>();
  const isEndOfMessage = useIsVisible(messageEndRef);

  const { data, isFetchedAfterMount } = useQuery({
    queryKey: [messageService.queryKey, chatId],
    queryFn: () => messageService.getMessages(chatId),
  });

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "instant",
    });
  }, [data, messageEndRef, isFetchedAfterMount]);

  return (
    <Fragment>
      <ScrollArea className="flex-1 space-y-4 overflow-y-auto">
        {data?.map((message) => (
          <Message key={message.id} sender={message.agent}>
            {message.content}
          </Message>
        ))}
        <div ref={messageEndRef} />
      </ScrollArea>
      <AnimatePresence>
        {!isEndOfMessage && (
          <motion.div
            className="absolute rounded-full bg-white border-[1px] border-slate-300 p-2 right-10 bottom-36 transition-all duration-150 ease-in-out shadow-md hover:bg-slate-100 hover:cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() =>
              messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ArrowDown className="text-slate-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
