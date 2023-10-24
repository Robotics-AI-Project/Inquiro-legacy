"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";

type Props = {
  onSubmit?: (text: string) => Promise<unknown>;
};

const Footer = ({ onSubmit }: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      await onSubmit?.(text);
      setText("");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <div className="relative z-50 flex flex-col flex-grow-0 flex-shrink-0 h-28 max-h-max justify-end items-center space-y-2 pb-4 bg-gradient-to-t from-white via-white/30">
      <div className="flex h-max space-x-2 items-end w-3/5">
        <div className="flex items-center justify-center h-full w-full bg-input rounded-md placeholder:text-gray-300">
          <Textarea
            className="resize-none px-5"
            minRows={1}
            maxRows={4}
            placeholder="Send a Message Here"
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                console.log("send message");
              }
            }}
            onChange={(e) => setText(e.target.value ?? "")}
          />
        </div>
        <Button
          className="pl-[10px] pr-3 transition-all duration-150"
          disabled={!text || text.length === 0}
          onClick={onClick}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </div>
      <p className="text-gray-400 text-sm">
        Text-To-SQL Query Generation and Data Visualization using Large Language
        Model
      </p>
    </div>
  );
};

export default Footer;
