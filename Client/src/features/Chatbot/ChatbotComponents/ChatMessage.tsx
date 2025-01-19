import robotIcon from "../../../assets/robotIcon.png";

export interface Chat {
  role: "user" | "model";
  text: string;
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
          className="w-8 h-8 rounded-full bg-white p-1"
        />
      )}
      <p
        className={`rounded-lg p-3 max-w-[80%] ${
          chat.role === "model"
            ? "bg-white shadow-sm"
            : "bg-[#4F7D6B] text-white"
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
