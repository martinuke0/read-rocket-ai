import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: Only use this in development
});

export const generateContent = async (
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  try {
    if (onChunk) {
      // Streaming mode
      const stream = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        stream: true,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullContent += content;
        onChunk(content);
      }
      return fullContent;
    } else {
      // Non-streaming mode
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0]?.message?.content || '';
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}; 