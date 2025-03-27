import { signOutAction } from "@/app/actions";
import Link from "next/link";
import Image from 'next/image'
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <div className="flex gap-5 items-center font-semibold outline">
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
      {user.email}
      <div className="inline-flex items-baseline">
        <Link href={"/account"}>
          <Image 
            src="/baddies.JPG" 
            className="mx-1 size-10 self-center rounded-full" width={20}
            height={20}
            alt="Boltsy Bear"/>
          </Link>
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
