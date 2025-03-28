import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText, type Message } from 'ai';

export const maxDuration = 30;


export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // Define the custom provider
  const modalvllm = createOpenAICompatible({
    name: 'modalvllm',
    apiKey: process.env.PROVIDER_API_KEY || "super_secret_key",
    baseURL: 'https://ramyij--example-vllm-openai-compatible-serve.modal.run/v1',
  });

  // check if user has sent a PDF
  const messagesHavePDF = messages.some(message =>
    message.experimental_attachments?.some(
      a => a.contentType === 'application/pdf',
    ),
  );

  const result = streamText({
    model: messagesHavePDF
      ? anthropic('claude-3-5-sonnet-latest')
      : modalvllm('neuralmagic/Meta-Llama-3.1-8B-Instruct-quantized.w4a16'),
    messages,
  });

  return result.toDataStreamResponse();
}