export const askQuestion = async (problemUrl, question) => {
    const response = await fetch("http://localhost:3001/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problemUrl, question }),
    });
    return response.json();
  };