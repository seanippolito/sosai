import { getChatsByUserId } from "@/lib/mockTypes/queries";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(`inside the get for the history by user Id ${user}`);
  console.log(
    `inside the get for the chats by user Id ${supabase.auth.getSession()}`,
    supabase.auth.getSession(),
  );

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  // biome-ignore lint: Forbidden non-null assertion.
  const response = await getChatsByUserId({ id: user.id! });
  if (response.error) {
    console.error("Error fetching chats:", response.error);
    return new Response("Failed to fetch chats", { status: 500 });
  }
  const chats: Array<Chat> = response.data || [];
  console.log("leaving the get for the chats by user Id", chats);
  return Response.json(chats);
}
