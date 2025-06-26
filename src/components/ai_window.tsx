import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { processWithAI } from "../aiService";

interface WindowProps {
  context: string;
  contextType: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Window = ({ context, contextType }: WindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cleanAIResponse = (text: string): string => {
    const thinkEndIndex = text.indexOf("</think>");

    if (thinkEndIndex !== -1) {
      const contentAfterThink = text.substring(thinkEndIndex + 8);
      return contentAfterThink.replace(/<[^>]*>/g, "").trim();
    }
    return text
      .replace(/<[^>]*>/g, "") // Remove any remaining HTML tags
      .trim();
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    try {
      const result = await processWithAI(inputValue, context, contextType);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: cleanAIResponse(result.response),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error processing with AI:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    const element = document.getElementById("moodaing-chat");
    if (element) {
      element.remove();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  return (
    <StyledWrapper>
      {isMinimized ? (
        <div className="minimized-bar" onClick={handleExpand}>
          <span className="minimized-title">MoodAIng Chat</span>
        </div>
      ) : (
        <div className="window">
          <div className="window-header">
            <span className="red" onClick={handleClose} />
            <span className="yellow" onClick={handleMinimize} />
          </div>
          <span className="window-title">MoodAIng Chat</span>
          <p className="window-description">Here to help!</p>

          <div className="chat-container">
            <div className="messages-area" ref={messagesAreaRef}>
              {messages.length === 0 && (
                <div className="empty-state">
                  <p>Start a conversation!</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.isUser ? "user-message" : "ai-message"
                  }`}
                >
                  <div className="message-bubble">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="message ai-message">
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              <div className="input-field">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Type something..."
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    color: "#dcdcdc",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    resize: "none",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                    opacity: isProcessing ? 0.6 : 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .window {
    width: 400px;
    min-height: 300px;
    max-height: 600px;
    padding: 20px;
    border: 1px solid #0d1117;
    border-radius: 10px;
    background-color: #000;
    opacity: 0.9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 9999;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    display: flex;
    flex-direction: column;
  }

  .window:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .window-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    flex-shrink: 0;
  }

  .window-header span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: opacity 0.2s;
    position: relative;
  }

  .window-header span:hover {
    opacity: 0.7;
  }

  .window-header .red {
    background-color: #ff5f57;
  }

  .window-header .red::before {
    content: "×";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
  }

  .window-header .yellow {
    background-color: #ffbd2e;
  }

  .window-header .yellow::before {
    content: "−";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
  }

  .window-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 10px;
    color: #e6e6ef;
    flex-shrink: 0;
  }

  .window-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
    flex-shrink: 0;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    min-height: 0;
  }

  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 150px;
    max-height: 400px;
  }

  .messages-area::-webkit-scrollbar {
    width: 6px;
  }

  .messages-area::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 3px;
  }

  .messages-area::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }

  .messages-area::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .empty-state {
    text-align: center;
    color: #666;
    font-style: italic;
    margin: auto;
  }

  .message {
    display: flex;
    margin-bottom: 8px;
  }

  .user-message {
    justify-content: flex-end;
  }

  .ai-message {
    justify-content: flex-start;
  }

  .message-bubble {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
  }

  .user-message .message-bubble {
    background-color: #007aff;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .ai-message .message-bubble {
    background-color: #2c2c2c;
    color: #e6e6ef;
    border-bottom-left-radius: 4px;
  }

  .message-text {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 4px;
    white-space: pre-wrap;
  }

  .message-time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;
  }

  .user-message .message-time {
    text-align: right;
  }

  .ai-message .message-time {
    text-align: left;
  }

  .typing-indicator {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 8px 0;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #666;
    animation: typing 1.4s infinite ease-in-out;
  }

  .typing-indicator span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes typing {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .input-area {
    flex-shrink: 0;
  }

  .input-field {
    background-color: #0d1117;
    color: #dcdcdc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      monospace;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 20px;
    padding: 12px 16px;
    border: 1px solid #333;
    height: 60px;
  }

  .input-field textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    color: #dcdcdc;
    border: none;
    outline: none;
    font-size: 14px;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
  }

  .minimized-bar {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: #000;
    border: 1px solid #0d1117;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    z-index: 9999;
    transition: all 0.2s;
    opacity: 0.9;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  .minimized-bar:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    opacity: 1;
  }

  .minimized-title {
    color: #e6e6ef;
    font-size: 14px;
    font-weight: 500;
  }
`;

export default Window;
