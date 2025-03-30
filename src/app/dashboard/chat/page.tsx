"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
          <div>
            {m?.experimental_attachments
              ?.filter(
                (attachment) =>
                  attachment?.contentType?.startsWith("image/") ||
                  attachment?.contentType?.startsWith("application/pdf"),
              )
              .map((attachment, index) =>
                attachment.contentType?.startsWith("image/") ? (
                  <Image
                    key={`${m.id}-${index}`}
                    src={attachment.url}
                    width={500}
                    height={500}
                    alt={attachment.name ?? `attachment-${index}`}
                  />
                ) : attachment.contentType?.startsWith("application/pdf") ? (
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
        className="fixed bottom-0 mb-8 w-full max-w-md space-y-2 rounded border border-gray-300 p-2 shadow-xl"
        onSubmit={(event) => {
          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        <input
          type="file"
          className=""
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
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
