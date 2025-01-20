import { useRef, FormEvent } from "react";
import { Chat } from "./ChatMessage";
import upArrow from "../../../assets/upArrow.png";

interface ChatBotFormProps {
  chatHistory: Chat[];
  setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
  generateBotResponse: (history: Chat[]) => void;
}

const ChatBotForm: React.FC<ChatBotFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      const userMessage = inputRef.current.value.trim();
      if (!userMessage) return;
      inputRef.current.value = "";

      setChatHistory((history) => [
        ...history,
        { role: "user", text: userMessage },
      ]);
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]);

        generateBotResponse([
          ...chatHistory,
          { role: "user", text: userMessage },
        ]);
      }, 600);
    }
  };

  return (
    <form
      action="#"
      onSubmit={handleFormSubmit}
      className="flex items-center gap-2 p-3 bg-white"
    >
      <input
        type="text"
        placeholder="Message..."
        ref={inputRef}
        required
        className="flex-1 rounded-full px-4 py-2 bg-gray-50/80 border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-green-500/30 focus:border-green-500/30 text-sm transition-all duration-200"
      />
      <button
        type="submit"
        className="p-2 rounded-full hover:bg-gray-50/80 transition-all duration-200"
      >
        <span>
          <img className="w-5 h-5 opacity-70" src={upArrow} alt="Up Arrow" />
        </span>
      </button>
    </form>
  );
};

export default ChatBotForm;
