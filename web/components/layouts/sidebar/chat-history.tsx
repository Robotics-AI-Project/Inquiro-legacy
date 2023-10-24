"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, MessageSquare, Plus } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chat.service";
import { ROUTES } from "@/constants/nav";

type Props = {
  chatId: string;
  title: string | null;
  active?: boolean;
};

const ChatTab = ({ title, chatId, active = false }: Props) => {
  const router = useRouter();
  const onNavigate = () => {
    router.push(ROUTES.CHAT.replace("[chatId]", chatId));
  };
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Button
        variant="ghost"
        onClick={onNavigate}
        className={cn(
          "group w-full justify-start px-3 py-5 relative",
          active && "bg-secondary/10 border-2 border-secondary/5"
        )}
      >
        <div className="flex space-x-3 items-center">
          <MessageSquare
            size={22}
            className="group-hover:scale-110 transition-all duration-200 ease-out"
          />
          <p className="text-base text-start text-ellipsis overflow-hidden whitespace-nowrap w-44 font-light text-white/80">
            {title ?? "Untitled chat"}
          </p>
        </div>
      </Button>
    </motion.div>
  );
};

const ChatHistory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: [chatService.queryKey],
    queryFn: chatService.getChatList,
  });
  const handleNewChat = () => {
    router.push("/app");
  };
  return (
    <div className="flex flex-col flex-auto w-full space-y-1 justify-start items-center text-white overflow-scroll">
      <Button
        variant="secondary"
        className="w-full justify-start items-center px-4 py-5 mb-1"
        onClick={handleNewChat}
      >
        <div className="flex space-x-3 items-center">
          <Plus size={22} />
          <p className="text-base">New Chat</p>
        </div>
      </Button>
      {isLoading && (
        <div className="flex w-full h-20 justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      <AnimatePresence>
        {data?.map(({ name, id }) => (
          <ChatTab
            key={id}
            title={name}
            chatId={id}
            active={pathname.includes(id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatHistory;
