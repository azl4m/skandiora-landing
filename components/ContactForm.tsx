"use client";

import { useEffect, useId, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cleanPhoneInput, enquiryLimits, enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";
import { services, destinationOptions } from "@/data/services";
import { studyCourses } from "@/data/study-abroad";
import { domesticCourses, domesticStates } from "@/data/domestic-admissions";
import { mbbsDestinations } from "@/data/mbbs-destinations";
import { site } from "@/data/site";
import { whatsappEnquiryUrl } from "@/lib/whatsapp-enquiry";
import SelectField, { type SelectOption } from "./SelectField";

type FormVariant = "general" | "study-abroad" | "mbbs" | "credit-transfer" | "domestic";
type FieldName = "name" | "phone" | "qualification" | "destination" | "course" | "intake" | "service" | "message";
type FormField = { name: FieldName; label: string; placeholder?: string; optional?: boolean; wide?: boolean; options?: SelectOption[] };

const serviceOptions = services.map((service) => service.navTitle);
const enquiryDestinations = [...new Set([...destinationOptions, ...mbbsDestinations.map((destination) => destination.name)])];
const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }));
const unsureOption = { value: "", label: "Not sure yet" };
const fixedServices = {
  "study-abroad": services.find((service) => service.slug === "study-abroad")?.navTitle ?? serviceOptions[0],
  mbbs: "MBBS Abroad", "credit-transfer": "Credit Transfer", domestic: "Domestic Admission",
};
const fieldClass = "w-full min-w-0 min-h-[54px] border border-gold/26 rounded-[10px] py-3.5 px-3.5 text-base text-[#EAF0FA] bg-[#0C1524] tracking-normal normal-case focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold aria-invalid:border-[#e3897f]";

function fieldsFor(variant: FormVariant): FormField[] {
  const fields: FormField[] = [
    { name: "name", label: "Full name", placeholder: "Your name" },
    { name: "phone", label: "Phone / WhatsApp", placeholder: "Your phone number" },
  ];
  const qualification: FormField = { name: "qualification", label: "Qualification", placeholder: "e.g. Plus Two, B.Tech or Diploma" };
  const course: FormField = { name: "course", label: "Course you’re looking for", options: [unsureOption, ...toOptions((variant === "domestic" ? domesticCourses : studyCourses).map((item) => item.name))] };
  const destination: FormField = {
    name: "destination", label: variant === "domestic" ? "Preferred state" : "Preferred destination",
    options: [unsureOption, ...toOptions(variant === "domestic" ? domesticStates : variant === "mbbs" ? mbbsDestinations.map((item) => item.name) : enquiryDestinations)],
  };
  if (variant === "domestic") return [...fields, qualification, destination, { ...course, wide: true }];
  if (variant === "credit-transfer") return [...fields, { name: "course", label: "Previous course", placeholder: "e.g. B.Tech, B.Com or Diploma", optional: true, wide: true }];
  if (variant === "general") return [...fields,
    { name: "service", label: "Service needed", options: toOptions(serviceOptions) }, destination,
    { ...qualification, optional: true, wide: true },
    { name: "message", label: "Your question or goal", placeholder: "Tell us what you would like help with", optional: true, wide: true },
  ];
  return [...fields, { ...course, label: "Course interest" }, destination,
    { ...qualification, label: "Education qualification", optional: true },
    { name: "intake", label: "Preferred intake", placeholder: "e.g. September 2027 / not sure", optional: true },
  ];
}

export default function ContactForm({ variant = "general" }: { variant?: FormVariant }) {
  const [status, setStatus] = useState<"idle" | "opening" | "error">("idle");
  const formId = useId();
  const fields = fieldsFor(variant);
  const { register, control, handleSubmit, setValue, setFocus, formState: { errors } } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema), mode: "onTouched", reValidateMode: "onChange", shouldFocusError: false,
    defaultValues: { name: "", phone: "", qualification: "", service: variant === "general" ? serviceOptions[0] : fixedServices[variant], destination: "", course: variant === "mbbs" ? "MBBS & Medicine" : "", intake: "", message: "", company: "" },
  });
  const selectedService = useWatch({ control, name: "service" });

  useEffect(() => {
    const destination = new URLSearchParams(window.location.search).get("destination");
    const options = fieldsFor(variant).find((field) => field.name === "destination")?.options;
    if (!destination || !options?.some((option) => option.value === destination)) return;
    setValue("destination", destination);
    if (variant === "general") setValue("service", fixedServices["study-abroad"]);
  }, [setValue, variant]);

  useEffect(() => {
    if (variant === "general" || variant === "credit-transfer") return;
    const selectInterest = (event: Event) => {
      const detail = (event as CustomEvent<{ course?: string; destination?: string }>).detail;
      if (!detail) return;
      for (const name of ["course", "destination"] as const) {
        const value = detail[name];
        const options = fieldsFor(variant).find((field) => field.name === name)?.options;
        if (value && options?.some((option) => option.value === value)) setValue(name, value, { shouldDirty: true, shouldValidate: true });
      }
      setStatus("idle");
    };
    window.addEventListener("study-enquiry", selectInterest);
    return () => window.removeEventListener("study-enquiry", selectInterest);
  }, [setValue, variant]);

  const onSubmit = (data: EnquiryInput) => {
    try {
      setStatus("opening");
      window.location.assign(whatsappEnquiryUrl(site.phoneHref, data));
    } catch { setStatus("error"); }
  };

  return (
    <form noValidate
      onSubmit={handleSubmit(onSubmit, (invalid) => {
        setStatus("idle");
        const first = fields.find((field) => invalid[field.name]);
        if (first) setFocus(first.name);
      })}
      aria-label={`${variant === "general" ? "General" : fixedServices[variant]} consultation enquiry`}
      className="@container min-w-0 bg-[#101A2B] border border-gold/16 rounded-[18px] min-[640px]:rounded-[22px] p-4 min-[400px]:p-5 min-[640px]:p-8 flex flex-col gap-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
    >
      {variant !== "general" && variant !== "credit-transfer" && <div className="mb-1">
        <p className="text-[10px] tracking-[0.16em] uppercase text-gold mb-1.5">Free initial consultation</p>
        <h2 className="font-heading text-[26px] min-[640px]:text-[30px] leading-tight text-cream">{variant === "domestic" ? "Let’s find the right path." : "Let’s explore your options."}</h2>
        <p className="text-[13px] leading-relaxed text-body-text mt-1.5">Tell us a little. We’ll take it from here.</p>
      </div>}
      {variant !== "general" && <input type="hidden" {...register("service")} />}
      <div className="grid grid-cols-1 @min-[440px]:grid-cols-2 gap-x-4 gap-y-1.5">
        {fields.map((field) => {
          const error = errors[field.name];
          const id = `${formId}-${field.name}`;
          const optional = field.name === "qualification" && selectedService === "Domestic Admission" ? false : field.optional;
          if (field.options) return <div key={field.name} className={`min-w-0 row-span-3 grid grid-rows-subgrid ${field.wide ? "col-span-full" : ""}`}>
            <Controller name={field.name} control={control} render={({ field: input }) => <SelectField label={field.label} name={input.name} value={input.value ?? ""} onChange={input.onChange} onBlur={input.onBlur} triggerRef={input.ref} error={error?.message} options={field.options!} />} />
          </div>;
          const inputProps = {
            id, placeholder: field.placeholder, maxLength: enquiryLimits[field.name],
            "aria-invalid": !!error, "aria-describedby": error ? `${id}-error` : undefined,
            "aria-required": !optional, className: fieldClass,
          };
          return <div key={field.name} className={`min-w-0 row-span-3 grid grid-rows-subgrid gap-1.5 ${field.wide ? "col-span-full" : ""}`}>
            <label htmlFor={id} className="text-xs leading-5 tracking-[0.1em] uppercase text-muted">{field.label}{optional && <span className="ml-1 normal-case tracking-normal text-[10px]">(optional)</span>}</label>
            {field.name === "message" ? <textarea {...inputProps} rows={3} {...register(field.name)} /> : <input
              {...inputProps} type={field.name === "phone" ? "tel" : "text"} inputMode={field.name === "phone" ? "tel" : "text"}
              autoComplete={field.name === "name" ? "name" : field.name === "phone" ? "tel" : "off"}
              {...register(field.name)}
              onInput={field.name === "phone" ? (event) => { event.currentTarget.value = cleanPhoneInput(event.currentTarget.value); } : undefined}
            />}
            {error && <span id={`${id}-error`} role="alert" className="text-[#e3897f] text-xs leading-relaxed">{error.message}</span>}
          </div>;
        })}
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("company")} />
      {Object.keys(errors).length > 0 && <p role="alert" className="text-xs leading-relaxed text-[#e3897f]">Please check the highlighted fields before continuing.</p>}
      <button type="submit" className="bg-gold text-[#0A1220] rounded-full min-h-12 py-3.5 px-4 text-sm font-medium cursor-pointer hover:bg-gold-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
        {status === "opening" ? "Open WhatsApp again" : "Continue to WhatsApp"}
      </button>
      <div aria-live="polite" role="status" className="text-xs text-muted text-center leading-relaxed">
        {status === "error" ? <span className="text-[#e3897f]">Could not open WhatsApp. Please try again or <a className="underline" href={`tel:${site.phoneHref}`}>call us directly</a>.</span>
          : status === "opening" ? "Tap Send in WhatsApp to complete your enquiry. Your message has not been sent automatically."
          : "Opens WhatsApp with your details. Tap Send to enquire."}
      </div>
    </form>
  );
}
