import { useState, useEffect } from "react";
import styled from "styled-components";
import { ChangeEvent } from "react";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.get(["isChecked"], (result) => {
        if (result.isChecked !== undefined) {
          setIsChecked(result.isChecked);
        }
      });
    }
  }, []);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked;
    setIsChecked(newState);

    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ isChecked: newState }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error saving toggle state:", chrome.runtime.lastError);
        }
      });
    } else {
      console.warn("Chrome storage API not available");
    }
  };

  return (
    <StyledWrapper>
      <div className="toggle-wrapper">
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className="toggle-container">
          <div className="toggle-button">
            <div className="toggle-button-circles-container">
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 0.5em;
    padding: 0.125em;
    background-image: linear-gradient(to bottom, #d5d5d5, #e8e8e8);
    box-shadow: 0 1px 1px rgb(255 255 255 / 0.6);
    /* resize for demo */
    font-size: 1.5em;
  }

  .toggle-checkbox {
    appearance: none;
    position: absolute;
    z-index: 1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    /* fix em sizing */
    font: inherit;
    opacity: 0;
    cursor: pointer;
  }

  .toggle-container {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 0.375em;
    width: 3em;
    height: 1.5em;
    background-color: #e8e8e8;
    box-shadow: inset 0 0 0.0625em 0.125em rgb(255 255 255 / 0.2),
      inset 0 0.0625em 0.125em rgb(0 0 0 / 0.4);
    transition: background-color 0.4s linear;
  }

  .toggle-checkbox:checked + .toggle-container {
    background-color: #f3b519;
  }

  .toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0.0625em;
    border-radius: 0.3125em;
    width: 1.375em;
    height: 1.375em;
    background-color: #e8e8e8;
    box-shadow: inset 0 -0.0625em 0.0625em 0.125em rgb(0 0 0 / 0.1),
      inset 0 -0.125em 0.0625em rgb(0 0 0 / 0.2),
      inset 0 0.1875em 0.0625em rgb(255 255 255 / 0.3),
      0 0.125em 0.125em rgb(0 0 0 / 0.5);
    transition: left 0.4s;
  }

  .toggle-checkbox:checked + .toggle-container > .toggle-button {
    left: 1.5625em;
  }

  .toggle-button-circles-container {
    display: grid;
    grid-template-columns: repeat(3, min-content);
    gap: 0.125em;
    position: absolute;
    margin: 0 auto;
  }

  .toggle-button-circle {
    border-radius: 50%;
    width: 0.125em;
    height: 0.125em;
    background-image: radial-gradient(circle at 50% 0, #f5f5f5, #c4c4c4);
  }
`;

export default Switch;
