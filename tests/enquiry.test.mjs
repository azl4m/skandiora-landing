import assert from "node:assert/strict";
import test from "node:test";
import { cleanPhoneInput, enquirySchema } from "../lib/enquiry-schema.ts";
import { whatsappEnquiryUrl } from "../lib/whatsapp-enquiry.ts";

const base = { name: "Anu Mathew", phone: "+91 98765 43210", service: "Domestic Admission", qualification: "Plus Two", destination: "Kerala", course: "Engineering" };

test("accepts and trims a complete domestic enquiry", () => {
  const result = enquirySchema.parse({ ...base, name: "  Anu Mathew  ", qualification: "  B.Tech  " });
  assert.equal(result.name, "Anu Mathew");
  assert.equal(result.qualification, "B.Tech");
});

test("accepts international names and common name punctuation", () => {
  for (const name of ["Anne-Marie O’Neill", "D'Souza", "A. Kumar", "José Silva", "അനു", "अनु शर्मा"]) {
    assert.equal(enquirySchema.safeParse({ ...base, name }).success, true, name);
  }
});

test("rejects blank, oversized and unsuitable names", () => {
  for (const name of ["", " ", "Student123", "Test<>Name", "---", "A".repeat(81)]) {
    assert.equal(enquirySchema.safeParse({ ...base, name }).success, false, name);
  }
});

test("phone checks accept formatting and enforce 7–15 digits", () => {
  for (const phone of ["9876543210", "+1 (415) 555-2671", "1234567", "+123456789012345"]) {
    assert.equal(enquirySchema.safeParse({ ...base, phone }).success, true, phone);
  }
  for (const phone of ["", "123456", "1234567890123456", "98765abc10", "91+9876543210", "+++++++", "(-------)"]) {
    assert.equal(enquirySchema.safeParse({ ...base, phone }).success, false, phone);
  }
});

test("phone input removes unwanted characters and caps pasted numbers", () => {
  assert.equal(cleanPhoneInput(" +91 (98765) 43210"), "+91 (98765) 43210");
  assert.equal(cleanPhoneInput("98abc76@54#3210"), "9876543210");
  assert.equal(cleanPhoneInput("+12345678901234567890").replace(/\D/g, "").length, 15);
  assert.equal(cleanPhoneInput("+91+9876543210"), "+919876543210");
});

test("domestic enquiries require qualification, other services keep it optional", () => {
  const invalid = enquirySchema.safeParse({ ...base, qualification: " " });
  assert.equal(invalid.success, false);
  assert.ok(invalid.error.issues.some((issue) => issue.path[0] === "qualification"));
  assert.equal(enquirySchema.safeParse({ ...base, service: "Credit Transfer", qualification: "" }).success, true);
});

test("qualifications allow useful punctuation but reject unwanted symbols and excessive length", () => {
  for (const qualification of ["10+2", "B.Tech (CSE)", "Diploma / ITI", "B.Com, 70%", "M.Sc - Physics"]) {
    assert.equal(enquirySchema.safeParse({ ...base, qualification }).success, true, qualification);
  }
  for (const qualification of ["<script>", "###", "---", "A".repeat(101)]) {
    assert.equal(enquirySchema.safeParse({ ...base, qualification }).success, false, qualification);
  }
});

test("undecided students can leave the state and course unselected", () => {
  assert.equal(enquirySchema.safeParse({ ...base, destination: "", course: "" }).success, true);
});

test("shared schema limits free text and rejects a filled spam field", () => {
  assert.equal(enquirySchema.safeParse({ ...base, message: "a".repeat(1001) }).success, false);
  assert.equal(enquirySchema.safeParse({ ...base, company: "spam" }).success, false);
});

test("WhatsApp message retains all five domestic enquiry details", () => {
  const url = new URL(whatsappEnquiryUrl("+91 89213 85573", enquirySchema.parse(base)));
  const message = url.searchParams.get("text");
  assert.equal(url.pathname, "/918921385573");
  for (const line of ["Name: Anu Mathew", "Phone / WhatsApp: +91 98765 43210", "Education qualification: Plus Two", "Preferred state: Kerala", "Course: Engineering", "Service: Domestic Admission"]) {
    assert.ok(message.includes(line), line);
  }
});
