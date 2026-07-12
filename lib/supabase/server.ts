import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig, getSupabaseServiceConfig } from "./config";
import type { Database, Profile } from "./types";

export async function createSupabaseServerClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always set cookies. Middleware refreshes them.
        }
      }
    }
  });
}

export function createSupabaseServiceClient() {
  const config = getSupabaseServiceConfig();

  if (!config) {
    return null;
  }

  return createClient<Database>(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export async function getCurrentProfile(): Promise<{
  profile: Profile | null;
  isConfigured: boolean;
}> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { profile: null, isConfigured: false };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { profile: null, isConfigured: true };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  return { profile: profile ?? null, isConfigured: true };
}
