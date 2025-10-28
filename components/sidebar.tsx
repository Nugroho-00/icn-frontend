"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageSquare } from "lucide-react";
import { SuggestionContent, useChatStore } from "@/store/sidebar";
import { useSendSuggestionContext } from "@/hooks/use-ai";
import React from "react";
export default function SidebarChat() {
  const sendContext = useSendSuggestionContext();
  const {
    input,
    setInput,
    messages,
    isOpen,
    setOpen: setIsOpen,
    setSelectedSuggestion,
    addMessage,
  } = useChatStore();

  const handleSelectSuggestion = (content: SuggestionContent) => {
    setSelectedSuggestion(content);
  };

  React.useEffect(() => {
    console.log(sendContext.data);
  }, [sendContext]);

  return (
    <>
      {/* 🟢 Tombol Toggle di pojok kanan bawah */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 rounded-full p-3 shadow-lg z-9991"
      >
        <MessageSquare />
      </Button>

      {/* 🟣 Sidebar dengan animasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[540px] bg-white border-l shadow-lg flex flex-col z-9999"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-lg">💬 Chat Assistant</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
            </div>

            {/* Body: Pesan */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => {
                if (msg.isAssistantSuggestion) {
                  return (
                    <>
                      <div className="flex gap-2 items-center">
                        <div
                          key={i}
                          className={`p-2 rounded-md max-w-[80%] ${"bg-gray-100 mr-auto"}`}
                        >
                          <div>{msg.content.title}</div>
                          <div>{msg.content.description}</div>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleSelectSuggestion(msg.content)}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-md max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-blue-100 self-end ml-auto"
                          : "bg-gray-100 mr-auto"
                      }`}
                    >
                      {msg.content}
                    </div>
                  );
                }
              })}
              {sendContext.isPending && (
                <p className="text-sm text-gray-500 italic">Thinking...</p>
              )}
            </div>

            {/* Footer: Input */}
            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addMessage({
                      id: crypto.randomUUID(),
                      role: "user",
                      content: input,
                      createdAt: new Date().toISOString(),
                      isAssistantSuggestion: false,
                    });
                    setInput("");
                    sendContext.mutate(
                      { context: input },
                      {
                        onSuccess: (data) => {
                          addMessage({
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: data.data.suggestions,
                            createdAt: new Date().toISOString(),
                            isAssistantSuggestion: false,
                          });

                          data.data.tasks.map((item: SuggestionContent) => {
                            addMessage({
                              id: crypto.randomUUID(),
                              role: "assistant",
                              content: item,
                              createdAt: new Date().toISOString(),
                              isAssistantSuggestion: true,
                            });
                          });
                        },
                      }
                    );
                  }
                }}
              />
              <Button
                onClick={() => {
                  setInput("");
                  addMessage({
                    id: crypto.randomUUID(),
                    role: "user",
                    content: input,
                    createdAt: new Date().toISOString(),
                    isAssistantSuggestion: false,
                  });
                  sendContext.mutate(
                    { context: input },
                    {
                      onSuccess: (data) => {
                        addMessage({
                          id: crypto.randomUUID(),
                          role: "assistant",
                          content: data.data.suggestions,
                          createdAt: new Date().toISOString(),
                          isAssistantSuggestion: false,
                        });

                        data.data.tasks.map((item: SuggestionContent) => {
                          addMessage({
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: item,
                            createdAt: new Date().toISOString(),
                            isAssistantSuggestion: true,
                          });
                        });
                      },
                    }
                  );
                }}
                disabled={sendContext.isPending}
              >
                Send
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
