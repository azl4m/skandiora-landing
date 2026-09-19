"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";
import { services, destinationOptions } from "@/data/services";

const serviceOptions = services.map((s) => s.navTitle);
const studentVisaLabel = services.find((s) => s.slug === "study-abroad")?.navTitle ?? serviceOptions[0];

const fieldClass =
  "border border-gold/26 rounded-[10px] py-3.5 px-3.5 text-[15px] text-[#EAF0FA] bg-[#0C1524] tracking-normal normal-case focus:outline-none focus:border-gold";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { service: serviceOptions[0], destination: "", company: "" },
  });

  useEffect(() => {
    const destination = new URLSearchParams(window.location.search).get("destination");
    if (!destination) return;
    setValue("destination", destination);
    setValue("service", studentVisaLabel);
  }, [setValue]);

  const onSubmit = async (data: EnquiryInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const submitLabel =
    status === "sending" ? "Sending…" : status === "sent" ? "Request received" : "Request assessment";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-0 bg-[#101A2B] border border-gold/16 rounded-[22px] p-[clamp(24px,3vw,36px)] flex flex-col gap-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-1 min-[420px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Full name
          <input type="text" placeholder="Your name" className={fieldClass} {...register("name")} />
          {errors.name && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Phone / WhatsApp
          <input type="tel" placeholder="+91" className={fieldClass} {...register("phone")} />
          {errors.phone && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors.phone.message}</span>}
        </label>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Service needed
          <select className={`${fieldClass} appearance-none`} {...register("service")}>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Preferred destination
          <select className={`${fieldClass} appearance-none`} {...register("destination")}>
            <option value="">Not sure yet</option>
            {destinationOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
        Your qualification &amp; goal
        <textarea
          rows={4}
          placeholder="e.g. B.Tech 3rd year, 4 backlogs, want to transfer credits"
          className={`${fieldClass} resize-y`}
          {...register("message")}
        />
      </label>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-gold text-[#0A1220] border-none rounded-full py-4 px-7 text-sm tracking-[0.08em] uppercase cursor-pointer hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
      {status === "error" ? (
        <span className="text-sm text-[#e3897f] text-center">
          Something went wrong. Please try again or call us directly.
        </span>
      ) : (
        <span className="text-[13px] text-muted text-center">We reply within one working day.</span>
      )}
    </form>
  );
}
