"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  order?: number;
  title: string;
  icon: LucideIcon;
  messages: {
    message: string;
    onClick?: () => void;
  }[];
  delay?: number;
};

const OnboardingNav = ({
  title,
  icon,
  messages,
  order = 0,
  delay = 0,
}: Props) => {
  const Icon = icon;
  const animationTime = 0.25;
  return (
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationTime,
        delay: delay + (animationTime / 1.5) * order,
        ease: "easeInOut",
      }}
    >
      <div className="flex flex-col items-center space-y-2">
        <Icon className="w-10 h-10 text-base" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {messages.map(({ message, onClick }, i) => (
        <motion.div
          key={message}
          className={cn(
            "flex items-end rounded-md py-3 px-4 w-72 bg-[#F2F2F2]",
            onClick && "hover:bg-[#e5e5e5] hover:cursor-pointer"
          )}
          onClick={onClick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: animationTime,
            delay: delay + (animationTime * i + (animationTime / 2) * order),
            ease: "easeInOut",
          }}
        >
          <p>{message}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OnboardingNav;
