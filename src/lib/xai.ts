import { toast } from 'react-hot-toast';

const XAI_API_KEY = 'xai-jnFUN4hEIzopeBl1lFLuYlQL6sMCSjslxXYV8T5WqPGGiIXU3pPc0cezKVU3VMImYHzvYsFuzmdxvqYc';
const API_URL = 'https://api.x.ai/v1/chat/completions';

async function makeXAIRequest(messages: any[]) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model: 'grok-beta',
        stream: false,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('X.AI API Error:', error);
    toast.error('Failed to get AI response');
    return 'Sorry, I am unable to provide an explanation at this moment.';
  }
}

export async function getAIExplanation(topic: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant that explains tasks and provides context about todo items.'
    },
    {
      role: 'user',
      content: `Please explain this todo item: "${topic}". Provide context and any relevant details.`
    }
  ];

  return makeXAIRequest(messages);
}

export async function askFollowUpQuestion(question: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant that answers questions about tasks and todo items.'
    },
    {
      role: 'user',
      content: question
    }
  ];

  return makeXAIRequest(messages);
}