import { signOutAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 border-4 border-green-800">
      <div className="flex items-center gap-5 font-semibold outline">
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
      <div className="hidden md:block">{user.email}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-4 border-amber-600">
          <Image
            src="/bolt_1.JPG"
            className="mx-1 size-10 rounded-full"
            width={20}
            height={20}
            alt="Boltsy Bear"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-content justify-items-start"
          align="end"
        >
          <DropdownMenuItem>
            <Link href={"/account"}>
              <Button type="button">Account</Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={signOutAction}>
              <Button type="submit">Sign out</Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
