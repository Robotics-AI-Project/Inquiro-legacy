"use client";

import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

type Props = {
  sender: "USER" | "CHATBOT";
} & PropsWithChildren;

const Message = ({ sender, children }: Props) => {
  return (
    <div
      className={cn(
        "px-32 py-10 flex w-full gap-5 items-start",
        sender === "CHATBOT" ? "bg-gray-100" : null
      )}
    >
      {sender === "USER" && <User2 className="h-10 w-10" />}
      {sender === "CHATBOT" && (
        <Image src="/logo/inquiro.svg" alt="bot-icon" width={40} height={40} />
      )}
      <div className="relative top-[5px]">{children}</div>
    </div>
  );
};

export default Message;
