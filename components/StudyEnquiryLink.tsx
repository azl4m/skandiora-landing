"use client";

import type { ReactNode } from "react";

export default function StudyEnquiryLink({ course, destination, className, children }: {
  course?: string;
  destination?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href="#contact" className={className} onClick={() => {
      window.dispatchEvent(new CustomEvent("study-enquiry", { detail: { course, destination } }));
    }}>
      {children}
    </a>
  );
}
