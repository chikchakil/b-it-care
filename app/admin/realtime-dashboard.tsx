"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminDashboardRealtime({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel("admin-leads-dashboard")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => {
        setCount((current) => current + 1);
        setPulse(true);
        window.setTimeout(() => setPulse(false), 1200);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="rounded-lg border border-blue-200/20 bg-blue-300/10 p-4 text-blue-100">
      <div className="flex items-center gap-3">
        <span className={pulse ? "animate-ping" : ""}>
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-blue-100/70">Realtime leads</p>
          <p className="text-2xl font-black">{count}</p>
        </div>
      </div>
    </div>
  );
}
