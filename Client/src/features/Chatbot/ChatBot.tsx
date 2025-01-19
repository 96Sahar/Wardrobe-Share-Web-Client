import { useEffect, useRef, useState } from "react";
import robotIcon from "../../assets/robotIcon.png";
import ChatBotForm from "./ChatbotComponents/ChatBotForm";
import ChatMessage, { Chat } from "./ChatbotComponents/ChatMessage";
import DownArrow from "../../assets/downArrow.png";
import Button from "../../utils/UtilsComponents/Button";

const ChatBot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      role: "model",
      text: `Hey! I am your Wardrobe Assistant bot 🤖`,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const generateBotResponse = async (history: Chat[]): Promise<void> => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    // Prepend the context-setting message as a "user" role
    const formattedHistory = [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant that only answers questions related to fashion, second-hand shopping, and crafting better item descriptions.
            Try to answer as shortly of an answers as possible. the website you're helping on called Wardrobe-Share, it's a second hand cloth's sharing website`,
          },
        ],
      },
      ...history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      })),
    ];

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL as string,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="mb-2">
          <img
            className="w-5 h-5 items-center"
            src={robotIcon}
            alt="Robot Icon"
          />
          <span>Need help from our bot?</span>
        </Button>
      )}
      {isOpen && (
        <div className="w-80 rounded-lg shadow-xl border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#4F7D6B] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={robotIcon || "/placeholder.svg"}
                alt="Robot Icon"
                className="w-8 h-8 rounded-full bg-white p-1"
              />
              <h2 className="text-white font-medium">Wardrobe Assistant</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-75 transition-opacity"
            >
              <span className="text-xl">
                <img src={DownArrow || "/placeholder.svg"} alt="Down Arrow" />
              </span>
            </button>
          </div>

          <div
            ref={chatBodyRef}
            className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            <div className="flex items-start gap-3"></div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="border-t border-gray-200 bg-white">
            <ChatBotForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
