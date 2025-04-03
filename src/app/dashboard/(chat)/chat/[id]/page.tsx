// import { cookies } from 'next/headers';
import { notFound } from "next/navigation";

import { Chat } from "@/components/chat";
import { getChatById, getMessagesByChatId } from "@/lib/mockTypes/queries";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { Attachment, UIMessage } from "ai";
import { createClient } from "@/utils/supabase/server";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const supabase = await createClient<Database>();
  const params = await props.params;
  const { id } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chat: Chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  if (chat.visibility === "private") {
    if (!user) {
      return notFound();
    }

    if (user.id !== chat.userId) {
      return notFound();
    }
  }

  const { data: messagesFromDb, error } = await getMessagesByChatId({
    id,
  });

  if (error || !messagesFromDb) {
    console.error("Error fetching messages:", error);
    return notFound();
  }

  function convertToUIMessages(messages: Array<Message>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage["parts"],
      role: message.role as UIMessage["role"],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: "",
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  // const cookieStore = await cookies();
  // const chatModelFromCookie = cookieStore.get('chat-model');

  // if (!chat) {
  return (
    <>
      <Chat
        id={id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedChatModel={DEFAULT_CHAT_MODEL}
        selectedVisibilityType={chat.visibility}
        isReadonly={user?.id !== chat.userId}
      />
      <DataStreamHandler id={id} />
    </>
  );
  // }

  // return (
  //   <>
  //     <Chat
  //       id={chat.id}
  //       initialMessages={convertToUIMessages(messagesFromDb)}
  //       selectedChatModel={chat.id}
  //       selectedVisibilityType={chat.visibility}
  //       isReadonly={user?.id !== chat.userId}
  //     />
  //     <DataStreamHandler id={id} />
  //   </>
  // );
}

// "use client";

// import { useChat } from "@ai-sdk/react";
// import { useRef, useState } from "react";
// import Image from "next/image";

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   const [files, setFiles] = useState<FileList | undefined>(undefined);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   return (
//     <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
//       {messages.map((m) => (
//         <div key={m.id} className="whitespace-pre-wrap">
//           {m.role === "user" ? "User: " : "AI: "}
//           {m.content}
//           <div>
//             {m?.experimental_attachments
//               ?.filter(
//                 (attachment) =>
//                   attachment?.contentType?.startsWith("image/") ||
//                   attachment?.contentType?.startsWith("application/pdf"),
//               )
//               .map((attachment, index) =>
//                 attachment.contentType?.startsWith("image/") ? (
//                   <Image
//                     key={`${m.id}-${index}`}
//                     src={attachment.url}
//                     width={500}
//                     height={500}
//                     alt={attachment.name ?? `attachment-${index}`}
//                   />
//                 ) : attachment.contentType?.startsWith("application/pdf") ? (
//                   <iframe
//                     key={`${m.id}-${index}`}
//                     src={attachment.url}
//                     width={500}
//                     height={600}
//                     title={attachment.name ?? `attachment-${index}`}
//                   />
//                 ) : null,
//               )}
//           </div>
//         </div>
//       ))}

//       <form
//         className="fixed bottom-0 mb-8 w-full max-w-md space-y-2 rounded border border-gray-300 p-2 shadow-xl"
//         onSubmit={(event) => {
//           handleSubmit(event, {
//             experimental_attachments: files,
//           });

//           setFiles(undefined);

//           if (fileInputRef.current) {
//             fileInputRef.current.value = "";
//           }
//         }}
//       >
//         <input

//           type="file"
//           className=""
//           placeholder="Cash me outside..."
//           onChange={(event) => {
//             if (event.target.files) {
//               setFiles(event.target.files);
//             }
//           }}
//           multiple
//           ref={fileInputRef}
//         />
//         <input
//           className="w-full p-2"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }
