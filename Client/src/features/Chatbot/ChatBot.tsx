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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const resetBot = () => {
    setChatHistory([
      {
        role: "model",
        text: `Hey! I am your Wardrobe Assistant bot 🤖`,
      },
    ]);
  };

  const generateBotResponse = async (history: Chat[]): Promise<void> => {
    const updateHistory = (text: string, isError: boolean = false): void => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      updateHistory(errorMessage, true);

      // Reset the bot on error after a brief delay
      setTimeout(() => {
        updateHistory("Resetting bot...", true);
        setTimeout(resetBot, 1000); // Add a delay for better UX
      }, 2000);
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
        <Button
          onClick={() => setIsOpen(true)}
          className="mb-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all"
        >
          <img className="w-5 h-5" src={robotIcon} alt="Robot Icon" />
          <span>Need help from our bot?</span>
        </Button>
      )}
      {isOpen && (
        <div className="w-80 rounded-lg shadow-2xl border border-gray-300 bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={robotIcon || "/placeholder.svg"}
                alt="Robot Icon"
                className="w-10 h-10 rounded-full bg-white p-2 shadow"
              />
              <h2 className="text-white font-semibold text-lg">
                Wardrobe Assistant
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none transition-transform transform hover:scale-105"
              aria-label="Close Chat"
            >
              <img
                src={DownArrow || "/placeholder.svg"}
                alt="Down Arrow"
                className="w-6 h-6"
              />
            </button>
          </div>

          <div
            ref={chatBodyRef}
            className="h-72 overflow-y-auto p-2 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md"
          >
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="border-t border-gray-200 bg-gray-100">
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
