"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./avatar";

export default function AccountForm({
  user,
  profile,
}: {
  user: User | null;
  profile: Profiles | null;
}) {
  const supabase = createClient<Database>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(profile?.email ?? null);
  const [fullname, setFullname] = useState<string | null>(
    profile?.full_name ?? null,
  );
  const [username, setUsername] = useState<string | null>(profile);
  const [website, setWebsite] = useState<string | null>(
    profile?.website ?? null,
  );
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: profiles,
        error,
        status,
      } = await supabase
        .from("profiles")
        .select(`email, full_name, username, website, avatar_url`)
        .eq("id", user?.id ?? "")
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (profiles) {
        setEmail(profiles.email);
        setFullname(profiles.full_name);
        setUsername(profiles.username);
        setWebsite(profiles.website);
        setAvatarUrl(profiles.avatar_url);
      }
    } catch (error) {
      alert(`Error loading user data! ${error}`);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert(`Error updating the data! ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={email || ""} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
