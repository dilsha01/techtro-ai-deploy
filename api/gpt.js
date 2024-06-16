import  OpenAI from "openai";

const openaiInstance = new OpenAI({
  apiKey: "sk-proj-utzLYkADGrZQ2QC7LD3XT3BlbkFJVDOC66cvlElgaWa1rZ43"
});

export const getChatCompletion = async (chats) => {
  try {
    const result = await openaiInstance.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a EbereGPT. You can help with graphic design tasks",
        },
        ...chats,
      ],
    });

    return result.data.choices[0].message;
  } catch (error) {
    console.error("Error getting chat completion:", error);
    throw error;
  }
};
