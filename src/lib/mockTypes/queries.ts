import "server-only";

// import {
//   user,
//   chat,
//   type User,
//   document,
//   type Suggestion,
//   suggestion,
//   message,
//   vote,
//   type DBMessage,
// } from "./schema";
import { ArtifactKind } from "@/components/artifact";
import { createClient } from "@/utils/supabase/server";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    console.log(userId);
    console.log(title);
    return await supabase
      .from("chat")
      .upsert({
        id: id,
        userId: userId,
        title: title,
        createdAt: new Date().toISOString(),
      })
      .select();
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    return await supabase.from("chat").delete().eq("id", id);
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    return await supabase.from("chat").select("*").eq("userId", id);
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    return await supabase.from("chat").select("*").eq("id", id);
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function saveMessages({ messages }: { messages: Array<Message> }) {
  try {
    const supabase = await createClient<Database>();
    console.log(messages);
    return await supabase.from("message").insert(messages).select();
  } catch (error) {
    console.error("Failed to save messages in database", error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();

    return await supabase.from("message").select("*").eq("chatId", id);
  } catch (error) {
    console.error("Failed to get messages by chat id from database", error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(chatId);
    console.log(messageId);
    console.log(type);
    return await supabase
      .from("vote")
      .insert([
        {
          chatId: chatId,
          messageId: messageId,
          isUpvoted: type === "up" ? true : false,
        },
      ])
      .select();
  } catch (error) {
    console.error("Failed to upvote message in database", error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();

    console.log(id);
    return await supabase.from("vote").select("*").eq("chatId", id);
  } catch (error) {
    console.error("Failed to get votes by chat id from database", error);
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(id);
    console.log(title);
    console.log(kind);
    console.log(content);
    console.log(userId);
    return await supabase
      .from("document")
      .insert([
        {
          id: id,
          title: title,
          kind: kind,
          content: content,
          userId: userId,
          createdAt: new Date().toISOString(),
        },
      ])
      .select();
  } catch (error) {
    console.error("Failed to save document in database");
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    return await supabase.from("document").select("*").eq("id", id);
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();
    console.log(id);
    return await supabase.from("document").select("*").eq("id", id).single();
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(id);
    console.log(timestamp);
    return await supabase
      .from("document")
      .delete()
      .eq("id", id)
      .gt("createdAt", timestamp.toISOString());
  } catch (error) {
    console.error(
      "Failed to delete documents by id after timestamp from database",
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(suggestions);
    return await supabase.from("suggestion").insert(suggestions).select();
  } catch (error) {
    console.error("Failed to save suggestions in database");
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(documentId);
    return await supabase
      .from("suggestion")
      .select("*")
      .eq("documentId", documentId);
  } catch (error) {
    console.error(
      "Failed to get suggestions by document version from database",
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const supabase = await createClient<Database>();

    console.log(id);
    return await supabase.from("message").select("*").eq("id", id);
  } catch (error) {
    console.error("Failed to get message by id from database");
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const supabase = await createClient<Database>();
    console.log(chatId);
    console.log(timestamp);

    return await supabase
      .from("document")
      .delete()
      .eq("chatId", chatId)
      .gt("createdAt", timestamp.toISOString());
  } catch (error) {
    console.error(
      "Failed to delete messages by id after timestamp from database",
    );
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    const supabase = await createClient<Database>();

    console.log(chatId);
    console.log(visibility);
    return await supabase
      .from("chat")
      .update({ visibility: visibility })
      .eq("id", chatId)
      .select();
  } catch (error) {
    console.error("Failed to update chat visibility in database");
    throw error;
  }
}
