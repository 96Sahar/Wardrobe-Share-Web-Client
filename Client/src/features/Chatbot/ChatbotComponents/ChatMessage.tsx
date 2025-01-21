import robotIcon from "../../../assets/robotIcon.png";

export interface Chat {
  role: "user" | "model";
  text: string;
  isError?: boolean;
}

interface ChatMessageProps {
  chat: Chat;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  return (
    <div
      className={`flex items-start gap-3 ${
        chat.role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      {chat.role === "model" && (
        <img
          src={robotIcon || "/placeholder.svg"}
          alt="Robot Icon"
          className={`w-7 h-7 rounded-full bg-white/90 p-1 shadow-sm ${
            chat.isError ? "text-red-500" : ""
          }`}
        />
      )}
      <p
        className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm ${
          chat.role === "model"
            ? "bg-white shadow-sm border border-gray-100"
            : "bg-green-600/90 text-white"
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
