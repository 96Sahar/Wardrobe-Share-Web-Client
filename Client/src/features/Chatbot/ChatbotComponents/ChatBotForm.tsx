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
      className="flex items-center gap-2 p-4"
    >
      <input
        type="text"
        placeholder="Message..."
        ref={inputRef}
        required
        className="flex-1 rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F7D6B] focus:border-transparent"
      />
      <button
        type="submit"
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <span>
          <img className="w-6 h-6" src={upArrow} alt="Up Arrow" />
        </span>
      </button>
    </form>
  );
};

export default ChatBotForm;
