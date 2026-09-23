import "./AIChatbot.css";
import {useState, useRef, useEffect} from "react";
import API from "../api/axios";

function AIChatbot() {
  const [open, setOpen] =useState(false);
  const [input, setInput] =useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] =
    useState([
      {
        sender: "ai",
        text:
          "👋 Hi! I'm Refresh Cart AI Assistant. How can I help you today?",
      },
    ]);

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.
      scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);
  const sendMessage =
    async () => {
      if (
        !input.trim() ||
        loading
      )
        return;
      const userInput = input;
      const userMessage = {
        sender: "user",
        text: userInput,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);
      setInput("");
      setLoading(true);
      try {
        const res =await API.post( "/chat",
            {
              message:
                userInput,
            }
          );
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              res.data.reply ||
              "Sorry, no response.",
          },
        ]);
      } catch (error) {
        console.log(error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              "⚠️ AI server error. Check backend or API key.",
          },
        ]);
      }
      setLoading(false);
    };
  return (
    <>
      {/* FLOATING AI BUTTON */}
      <div
        className="ai-button"
        onClick={() =>setOpen(!open) } >
        🤖
      </div>
      {/* CHATBOX */}
      {open && (
        <div className="chatbot-box">
          {/* HEADER */}
          <div className="chatbot-header">
            Refresh Cart AI
          </div>
          {/* MESSAGES */}
          <div className="chat-messages">
            {messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  className={
                    msg.sender ===
                    "user"
                      ? "user-message"
                      : "ai-message"
                  }
                >
                  {msg.text}
                </div>
              )
            )}

          /* LOADING */
            {loading && (
              <div className="ai-message">
                Typing...
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

        /* INPUT */
          <div className="chat-input-box">
            <input type="text" placeholder="Ask something..."
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key ===
                  "Enter" && sendMessage()
              }
            />
            <button onClick={ sendMessage }>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;