import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient<Database>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data } = await supabase
    .from("profiles")
    .select(`email, full_name, username, website, avatar_url`)
    .eq("id", user.id)
    .single();

  console.log(`In the account page ${user}`);
  console.log(`In the account page ${data}`);
  return <AccountForm user={user} profile={data} />;
}
