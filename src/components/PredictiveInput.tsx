import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Groq from "groq-sdk";

interface PredictiveInputProps {
  isPredictiveEnabled: boolean;
  placeholder?: string;
}

const PredictiveInput: React.FC<PredictiveInputProps> = ({
  isPredictiveEnabled,
  placeholder = "Start typing...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState("");
  const [, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY });


  const getPrediction = async (text: string) => {
    if (!text.trim() || !isPredictiveEnabled) {
      setPrediction("");
      return;
    }

    setIsLoading(true);
    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Complete this sentence naturally: "${text}"`,
          },
        ],
        model: "llama-3.1-8b-instant",
        max_tokens: 50,
        temperature: 0.7,
      });

      const predictedText = response.choices[0].message.content ?? " ";
      // Only show the new part as prediction, not the whole response
      const newTextPrediction = predictedText.slice(text.length);
      setPrediction(newTextPrediction);
    } catch (error) {
      console.error("Error getting prediction:", error);
      setPrediction("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (isPredictiveEnabled) {
        getPrediction(inputValue);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, isPredictiveEnabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (!isPredictiveEnabled) {
      setPrediction("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && prediction && isPredictiveEnabled) {
      e.preventDefault();
      setInputValue(inputValue + prediction);
      setPrediction("");
    }
  };

  return (
    <InputWrapper>
      <InputContainer>
        <BaseInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <PredictionText $visible={!!prediction && isPredictiveEnabled}>
          {inputValue}
          <PredictedPart>{prediction}</PredictedPart>
        </PredictionText>
        {prediction && isPredictiveEnabled && <TabHint>Press Tab ↹</TabHint>}
      </InputContainer>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const BaseInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  position: relative;
  background: transparent;
  z-index: 2;

  &:focus {
    border-color: #007aff;
  }
`;

const PredictionText = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  font-size: 16px;
  color: #000;
  pointer-events: none;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  z-index: 1;
`;

const PredictedPart = styled.span`
  color: #999;
`;

const TabHint = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  z-index: 3;
`;

export default PredictiveInput;