import { create } from "zustand";

export type SuggestionContent = {
  title: string;
  description: string;
};

export type ChatMessage =
  | {
      id: string;
      role: "assistant";
      content: SuggestionContent;
      createdAt: string;
      isAssistantSuggestion: true;
    }
  | {
      id: string;
      role: "user" | "assistant";
      content: string;
      createdAt: string;
      isAssistantSuggestion: false;
    };

type ChatState = {
  isOpen: boolean;
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  aiSuggestionContentSelected: SuggestionContent;

  // actions
  setOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setInput: (value: string) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  // sendMessage: (content: string) => Promise<void>;
  setSelectedSuggestion: (content: SuggestionContent) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],
  input: "",
  isLoading: false,
  aiSuggestionContentSelected: { title: "", description: "" },

  setOpen: (open) => set({ isOpen: open }),
  setInput: (value) => set({ input: value }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // sendMessage: async (msg: ChatMessage) => {
  //   // const userMsg: ChatMessage = {
  //   //   id: crypto.randomUUID(),
  //   //   role: "user",
  //   //   content,
  //   //   createdAt: new Date().toISOString(),
  //   //   isAssistantSuggestion: false,
  //   // };

  //   set((state) => ({
  //     messages: [...state.messages, msg],
  //     input: ""
  //   }));

  //   // try {
  //   //   // Contoh: panggil API AI kamu
  //   //   // const res = await fetch("/api/chat", {
  //   //   //   method: "POST",
  //   //   //   headers: { "Content-Type": "application/json" },
  //   //   //   body: JSON.stringify({ message: content }),
  //   //   // });

  //   //   const dummy = {
  //   //     success: true,
  //   //     statusCode: 200,
  //   //     message: "Resource created successfully",
  //   //     data: {
  //   //       suggestions:
  //   //         'It looks like the context provided was "aa", which doesn\'t give me specific details about your situation or goals. To give you the most helpful suggestions, more information would be great!\n\nHowever, based on a general need for productivity and organization, here are 3 universally actionable tasks:\n\n1.  **Review your current to-do list:** Look at everything you have planned for today or this week and prioritize the top 3 most important items.\n2.  **Organize your digital workspace:** Spend 15-30 minutes tidying your desktop, email inbox, or downloads folder to reduce clutter.\n3.  **Plan your next day:** Before finishing your current tasks, take 5-10 minutes to jot down 1-3 key tasks you want to accomplish tomorrow to start with clarity.',
  //   //       tasks: [
  //   //         {
  //   //           title: "**Review your current to",
  //   //           description:
  //   //             "do list:** Look at everything you have planned for today or this week and prioritize the top 3 most important items.",
  //   //         },
  //   //         {
  //   //           title: "**Organize your digital workspace",
  //   //           description:
  //   //             "** Spend 15-30 minutes tidying your desktop, email inbox, or downloads folder to reduce clutter.",
  //   //         },
  //   //         {
  //   //           title: "**Plan your next day",
  //   //           description:
  //   //             "** Before finishing your current tasks, take 5-10 minutes to jot down 1-3 key tasks you want to accomplish tomorrow to start with clarity.",
  //   //         },
  //   //       ],
  //   //     },
  //   //     timestamp: "2025-10-27T02:55:16.376Z",
  //   //     path: "/api/ai/suggestions",
  //   //   };

  //   //   const data = dummy.data;

  //   //   const aiMsg: ChatMessage = {
  //   //     id: crypto.randomUUID(),
  //   //     role: "assistant",
  //   //     content: data.suggestions ?? "No response",
  //   //     createdAt: new Date().toISOString(),
  //   //     isAssistantSuggestion: false,
  //   //   };

  //   //   const aiSuggestion: ChatMessage[] = dummy.data.tasks.map((item) => {
  //   //     return {
  //   //       id: crypto.randomUUID(),
  //   //       role: "assistant",
  //   //       content: item,
  //   //       createdAt: new Date().toISOString(),
  //   //       isAssistantSuggestion: true,
  //   //     };
  //   //   });

  //   //   set((state) => ({
  //   //     messages: [...state.messages, aiMsg, ...aiSuggestion],
  //   //     isLoading: false,
  //   //   }));
  //   // } catch (e) {
  //   //   set({ isLoading: false });
  //   // }
  // },
  setSelectedSuggestion: (content) =>
    set({ aiSuggestionContentSelected: content }),
}));
