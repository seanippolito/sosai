import type { Database as DB, Table as T } from "@/lib/database.types";
import { type User as U } from "@supabase/supabase-js";

declare global {
  type Database = DB;
  type User = U;
  type Profiles = T<"profiles">;
  type Chat = T<"chat">;
  type Document = T<"document">;
  type Message = T<"message">;
  type Suggestion = T<"suggestion">;
  type Vote = T<"vote">;
}
