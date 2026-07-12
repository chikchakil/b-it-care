"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";
import type { Database } from "./types";

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createBrowserClient<Database>(config.url, config.anonKey);
}
