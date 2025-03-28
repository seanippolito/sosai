'use client';
import { useChat } from '@ai-sdk/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function Chat() {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    error, // Add this to check for errors
    isLoading // Add this to check loading state
  } = useChat();
  
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add debugging logs for hook states
  useEffect(() => {
    if (error) {
      console.error("useChat hook error:", error);
    }
  }, [error]);
  
  useEffect(() => {
    console.log("Messages state updated:", messages);
  }, [messages]);
  
  // Custom submit handler with logging
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with input:", input);
    console.log("Files attached:", files ? Array.from(files).map(f => f.name) : "none");
    
    try {
      await handleSubmit(event, {
        experimental_attachments: files,
      });
      console.log("handleSubmit completed successfully");
    } catch (submitError) {
      console.error("Error during form submission:", submitError);
    }
    
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* Display any errors to the user */}
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          Error: {error.message || "An unknown error occurred"}
        </div>
      )}
      
      {/* Show loading state */}
      {isLoading && (
        <div className="p-2 text-blue-700">
          Loading response...
        </div>
      )}
      
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
          <div>
            {m?.experimental_attachments
              ?.filter(
                attachment =>
                  attachment?.contentType?.startsWith('image/') ||
                  attachment?.contentType?.startsWith('application/pdf'),
              )
              .map((attachment, index) =>
                attachment.contentType?.startsWith('image/') ? (
                  <Image
                    key={`${m.id}-${index}`}
                    src={attachment.url}
                    width={500}
                    height={500}
                    alt={attachment.name ?? `attachment-${index}`}
                  />
                ) : attachment.contentType?.startsWith('application/pdf') ? (
                  <iframe
                    key={`${m.id}-${index}`}
                    src={attachment.url}
                    width={500}
                    height={600}
                    title={attachment.name ?? `attachment-${index}`}
                  />
                ) : null,
              )}
          </div>
        </div>
      ))}
      
      <form
        className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl space-y-2"
        onSubmit={handleFormSubmit}
      >
        <input
          type="file"
          className=""
          onChange={event => {
            if (event.target.files) {
              setFiles(event.target.files);
              console.log("Files selected:", Array.from(event.target.files).map(f => f.name));
            }
          }}
          multiple
          ref={fileInputRef}
        />
        <input
          className="w-full p-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}