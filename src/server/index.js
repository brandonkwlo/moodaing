const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant. You are tasked with performing one of the three tasks depending on 
            the prompt: given a selection, given a page, or discussing with the user. Given the context from the 
            user, you are to provide a response. 
            
            In your response: 
            - Give a brief response. The response should be 4 sentences max 
            - Do not mention the given context in your response
            - Do not mention that you are checking or what the user has asked in your response
            `,
        },
        { role: "user", content: prompt },
      ],
      model: "deepseek-r1-distill-llama-70b",
    });
    res.json({ response: response.choices[0]?.message?.content || "" });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
