import { cookies } from "next/headers";

import { Chat } from "@/components/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Page() {
  console.log(`This is in the chat [page] }`);

  const supabase = await createClient<Database>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(`I am stuck on this ${user}`);
  if (!user) {
    return redirect("/sign-in");
  }

  const id = generateUUID();
  console.log(`This is in the chat [page] ${id}`);

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  if (!modelIdFromCookie) {
    // No chat found, create a new one
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          selectedVisibilityType="private"
          isReadonly={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={id}
        selectedVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
