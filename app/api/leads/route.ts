import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

type LeadRequestBody = {
  fullName?: string;
  phone?: string;
  email?: string;
  business?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LeadRequestBody;
  const fullName = body.fullName?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const business = body.business?.trim();
  const message = body.message?.trim();

  if (!fullName || !phone || !email || !business || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role is not configured" }, { status: 500 });
  }

  const { error } = await supabase.from("leads").insert({
    full_name: fullName,
    phone,
    email,
    business_name: business,
    message,
    source: "website",
    status: "new",
    assigned_to: null,
    notes: null
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
