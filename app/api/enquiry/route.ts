import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { site } from "@/data/site";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your enquiry details", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { name, phone, service, destination, course, qualification, intake, language, message, company } = parsed.data;
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !resendFrom) {
    return NextResponse.json({ error: "Enquiry delivery is not configured" }, { status: 503 });
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: process.env.ENQUIRY_TO_EMAIL || site.email,
        subject: `New enquiry — ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nService: ${service}\nCourse: ${course || "Not specified"}\n${service === "Domestic Admission" ? "Preferred state" : "Preferred destination"}: ${destination || "Not sure yet"}\nQualification: ${qualification || "Not specified"}\nIntake: ${intake || "Not specified"}\nLanguage details: ${language || "Not specified"}\nMessage: ${message || "—"}`,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Could not send enquiry" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Could not send enquiry" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
