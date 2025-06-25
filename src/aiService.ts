export async function processWithAI(
  userInput: string,
  context: string,
  contextType: string
): Promise<any> {
  const prompt = `
Context: ${context}

Context Type: ${contextType}

User Input: ${userInput}

Please provide a helpful response based on the context and user input above.
`;

  const res = await fetch("http://localhost:3001/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return { response: data.response };
}
