"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";
import { services, destinationOptions } from "@/data/services";
import { studyCourses } from "@/data/study-abroad";
import { site } from "@/data/site";
import { whatsappEnquiryUrl } from "@/lib/whatsapp-enquiry";
import SelectField from "./SelectField";
import { featuredMbbsDestinations } from "@/data/mbbs-destinations";
import { ChevronDown } from "lucide-react";
import { useId } from "react";

const serviceOptions = services.map((s) => s.navTitle);
const enquiryDestinations = [...new Set([...destinationOptions, ...featuredMbbsDestinations.map((destination) => destination.name)])];
const studentVisaLabel = services.find((s) => s.slug === "study-abroad")?.navTitle ?? serviceOptions[0];

const fieldClass =
  "w-full min-w-0 min-h-12 border border-gold/26 rounded-[10px] py-3 min-[640px]:py-3.5 px-3.5 text-[16px] text-[#EAF0FA] bg-[#0C1524] tracking-normal normal-case focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold";

export default function ContactForm({ studyAbroad = false }: { studyAbroad?: boolean }) {
  const [status, setStatus] = useState<"idle" | "opening" | "error">("idle");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { service: serviceOptions[0], destination: "", course: "", company: "" },
  });

  useEffect(() => {
    const destination = new URLSearchParams(window.location.search).get("destination");
    if (!destination) return;
    setValue("destination", destination);
    setValue("service", studentVisaLabel);
  }, [setValue]);

  useEffect(() => {
    if (!studyAbroad) return;
    const selectInterest = (event: Event) => {
      const { course, destination } = (event as CustomEvent<{ course?: string; destination?: string }>).detail;
      if (course) setValue("course", course, { shouldDirty: true });
      if (destination) setValue("destination", destination, { shouldDirty: true });
      setStatus("idle");
    };
    window.addEventListener("study-enquiry", selectInterest);
    return () => window.removeEventListener("study-enquiry", selectInterest);
  }, [setValue, studyAbroad]);

  const onSubmit = (data: EnquiryInput) => {
    try {
      setStatus("opening");
      window.location.assign(whatsappEnquiryUrl(site.phoneHref, data));
    } catch {
      setStatus("error");
    }
  };

  const submitLabel =
    status === "opening" ? "Open WhatsApp again" : "Continue to WhatsApp";

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (invalid) => {
        const hiddenError = (["qualification", "intake", "language", "message"] as const).find((name) => invalid[name]);
        if (hiddenError) {
          setDetailsOpen(true);
          requestAnimationFrame(() => setFocus(hiddenError));
        }
      })}
      aria-label={studyAbroad ? "Study abroad consultation enquiry" : "Enquiry form"}
      className="min-w-0 bg-[#101A2B] border border-gold/16 rounded-[18px] min-[640px]:rounded-[22px] p-4 min-[400px]:p-5 min-[640px]:p-8 flex flex-col gap-3.5 min-[640px]:gap-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
    >
      {studyAbroad && (
        <div className="mb-1">
          <p className="text-[10px] tracking-[0.16em] uppercase text-gold mb-1.5">Free initial consultation</p>
          <h2 className="font-heading text-[26px] min-[640px]:text-[30px] leading-tight text-cream">Let’s explore your options.</h2>
          <p className="text-[13px] leading-relaxed text-body-text mt-1.5">Tell us a little. We’ll take it from here.</p>
        </div>
      )}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Full name
          <input type="text" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} className={fieldClass} {...register("name")} />
          {errors.name && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
          Phone / WhatsApp
          <input type="tel" autoComplete="tel" placeholder="Your phone number" aria-invalid={!!errors.phone} className={fieldClass} {...register("phone")} />
          {errors.phone && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors.phone.message}</span>}
        </label>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        {studyAbroad ? <>
          <input type="hidden" {...register("service")} />
          <Controller name="course" control={control} render={({ field, fieldState }) => (
            <SelectField label="Course interest" name={field.name} value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} triggerRef={field.ref} error={fieldState.error?.message}
              options={[{ value: "", label: "Not sure yet" }, ...studyCourses.map((course) => ({ value: course.name, label: course.name }))]} />
          )} />
        </> : <Controller name="service" control={control} render={({ field, fieldState }) => (
          <SelectField label="Service needed" name={field.name} value={field.value} onChange={field.onChange} onBlur={field.onBlur} triggerRef={field.ref} error={fieldState.error?.message}
            options={serviceOptions.map((service) => ({ value: service, label: service }))} />
        )} />}
        <Controller name="destination" control={control} render={({ field, fieldState }) => (
          <SelectField label="Preferred destination" name={field.name} value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} triggerRef={field.ref} error={fieldState.error?.message}
            options={[{ value: "", label: "Not sure yet" }, ...enquiryDestinations.map((destination) => ({ value: destination, label: destination }))]} />
        )} />
      </div>

      <button type="button" aria-expanded={detailsOpen} aria-controls={detailsId} onClick={() => setDetailsOpen((open) => !open)} className="min-[640px]:hidden flex min-h-12 items-center justify-between gap-3 rounded-xl border border-gold/20 px-3.5 py-3 text-left focus-visible:outline-2 focus-visible:outline-gold">
        <span><span className="block text-sm text-cream">{studyAbroad ? "Add academic details" : "Add your qualification & goal"}</span><span className="block text-xs text-muted mt-0.5">{studyAbroad ? "Qualification, intake, language or a note · Optional" : "Optional — share a little more"}</span></span>
        <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-gold transition-transform motion-reduce:transition-none ${detailsOpen ? "rotate-180" : ""}`} />
      </button>
      <div id={detailsId} className={`${detailsOpen ? "flex" : "hidden"} min-[640px]:flex flex-col gap-4`}>
      {studyAbroad && (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          {([
            { name: "qualification", label: "Education qualification", placeholder: "e.g. Plus Two, B.Tech, diploma" },
            { name: "intake", label: "Preferred intake", placeholder: "e.g. September 2027 / not sure" },
            { name: "language", label: "Language / test details", placeholder: "e.g. IELTS 6.5, German B1, not taken" },
          ] as const).map((field) => (
            <label key={field.name} className={`min-w-0 flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted ${field.name === "language" ? "col-span-full" : ""}`}>
              {field.label} <span className="text-[10px] normal-case tracking-normal">Optional</span>
              <input type="text" placeholder={field.placeholder} aria-invalid={!!errors[field.name]} className={fieldClass} {...register(field.name)} />
              {errors[field.name] && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors[field.name]?.message}</span>}
            </label>
          ))}
        </div>
      )}

      <label className="flex flex-col gap-1.5 text-xs tracking-[0.14em] uppercase text-muted">
        {studyAbroad ? "Anything we should know? (optional)" : "Your qualification & goal"}
        <textarea
          rows={studyAbroad ? 2 : 4}
          placeholder={studyAbroad ? "Your marks, budget or a question…" : "e.g. B.Tech 3rd year, 4 backlogs, want to transfer credits"}
          className={`${fieldClass} resize-y`}
          {...register("message")}
        />
        {errors.message && <span className="normal-case tracking-normal text-[#e3897f] text-xs">{errors.message.message}</span>}
      </label>

      </div>

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
        className="bg-gold text-[#0A1220] border-none rounded-full min-h-12 py-3.5 px-4 text-sm font-medium cursor-pointer hover:bg-gold-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
      <div aria-live="polite" role="status" className="text-xs text-muted text-center leading-relaxed">
        {status === "error" ? <span className="text-[#e3897f]">Could not open WhatsApp. Please try again or <a className="underline" href={`tel:${site.phoneHref}`}>call us directly</a>.</span>
          : status === "opening" ? "Tap Send in WhatsApp to complete your enquiry. Your message has not been sent automatically."
          : "Opens WhatsApp with your details. Tap Send to enquire."}
      </div>
    </form>
  );
}
