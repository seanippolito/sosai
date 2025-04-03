import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  console.log(`Inside dashboard page`);
  const supabase = await createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log(`User not found, redirecting to sign-in`);
    return redirect("/sign-in");
  }

  console.log(`Leaving dashboard page`);
  return (
    <pre className="border-4 border-cyan-300">
      {JSON.stringify(user, null, 2)}
    </pre>
  );
}
