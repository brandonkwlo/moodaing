import styled from "styled-components";
import { useState } from "react";
import { processWithAI } from "../aiService";

interface WindowProps {
  context: string;
  contextType: string;
}

const Window = ({ context, contextType }: WindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      await processWithAI(inputValue, context, contextType);

      setInputValue("");
    } catch (error) {
      console.error("Error processing with AI:", error);
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
          <span className="minimized-title"> MoodAIng Chat</span>
        </div>
      ) : (
        <div className="window">
          <div className="window-header">
            <span className="red" onClick={handleClose} />
            <span className="yellow" onClick={handleMinimize} />
          </div>
          <span className="window-title">MoodAIng Chat</span>
          <p className="window-description">Here to help!</p>
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
          {isProcessing && (
            <div className="processing-indicator">Processing... </div>
          )}
        </div>
      )}
      ;
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .window {
    width: 400px;
    padding: 20px;
    border: 1px solid #0d1117;
    border-radius: 10px;
    background-color: #000;
    opacity: 0.9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 9999;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
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
  }

  .window-header span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .window-header span:hover {
    opacity: 0.7;
  }

  .window-header .red {
    background-color: #ff5f57;
  }

  .window-header .yellow {
    background-color: #ffbd2e;
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

  .window-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 10px;
    color: #e6e6ef;
  }

  .window-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  .window .window-tag {
    display: inline-block;
    font-size: 10px;
    border-radius: 5px;
    background-color: #0d1117;
    padding: 4px;
    margin-block-end: 12px;
    color: #dcdcdc;
  }
  .input-field {
    background-color: #0d1117;
    color: #dcdcdc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      monospace;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 5px;
    padding: 15px;
    overflow: clip;
    height: 100px;
    border: 1px solid #333;
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
`;

export default Window;
