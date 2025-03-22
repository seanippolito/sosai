import { createClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}