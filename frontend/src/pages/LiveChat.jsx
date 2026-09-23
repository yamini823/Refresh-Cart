import { useState } from "react";
import "./LiveChat.css";
import API from "../api/axios";

function LiveChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm RefreshCart AI. How can I help you today?"
    }
  ]);

 const sendMessage = async () => {

  if (!message.trim()) return;

  const userMsg = {
    sender: "user",
    text: message
  };

  setMessages((prev) => [...prev, userMsg]);

  // Typing message add
  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "Typing..."
    }
  ]);

  try {

    const res = await API.post("/chat", {
      message
    });

    // Remove Typing... and add real response
    setMessages((prev) => {
      const updated = [...prev];
      updated.pop(); // remove Typing...
      return [
        ...updated,
        {
          sender: "bot",
          text: res.data.reply
        }
      ];
    });

  } catch (error) {

    setMessages((prev) => {
      const updated = [...prev];
      updated.pop();

      return [
        ...updated,
        {
          sender: "bot",
          text: "Sorry, AI is unavailable."
        }
      ];
    });

  }

  setMessage("");
};
  return (
    <div className="chat-page">
      <div className="chat-container">

        <div className="chat-header">
  <span style={{fontSize:"32px"}}>
    🤖
  </span>

  <div style={{marginLeft:"12px"}}>
    <div>RefreshCart AI</div>
    <small style={{
      fontSize:"13px",
      opacity:"0.9"
    }}>
      Online
    </small>
  </div>
</div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "message user"
                  : "message bot"
              }
            >
              {msg.text}
            </div>
          ))}
        </div>

        
        

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
          />

          <button
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default LiveChat;