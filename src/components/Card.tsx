import styled from "styled-components";
import { useState } from "react";

const Window = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <StyledWrapper>
      <div className="window">
        <div className="window-header">
          <span className="red" />
          <span className="yellow" />
          <span className="green" />
        </div>
        <span className="window-title">AI Chat</span>
        <p className="window-description">Here to help!</p>
        <div className="code-editor">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
            style={{
              width: "100%",
              background: "transparent",
              color: "#dcdcdc",
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>
      </div>
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
  }

  .window-header .red {
    background-color: #ff5f57;
  }

  .window-header .yellow {
    background-color: #ffbd2e;
  }

  .window-header .green {
    background-color: #28c941;
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
  .code-editor {
    background-color: #0d1117;
    color: #dcdcdc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      monospace;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 5px;
    padding: 15px;
    overflow: auto;
    height: 150px;
    border: 1px solid #333;
  }

  .code-editor::-webkit-scrollbar {
    width: 8px;
  }

  .code-editor::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  .code-editor pre code {
    white-space: pre-wrap;
    display: block;
  }
`;

export default Window;
