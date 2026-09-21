This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Enquiry delivery

Website forms open WhatsApp at `+91 89213 85573` with the validated enquiry details prefilled. The visitor must tap Send in WhatsApp; opening the link does not send the message. No email configuration is required for this flow. The destination number is sourced from `data/site.ts`.

The email API at `/api/enquiry` is retained but is not called by these forms. To use it separately, configure:

- `RESEND_API_KEY`: API key for your Resend account.
- `RESEND_FROM_EMAIL`: Sender address on a domain verified in that account, for example `Skandiora website <enquiries@your-verified-domain.com>`.
- `ENQUIRY_TO_EMAIL`: Business inbox that receives enquiries; defaults to the email in `data/site.ts`.

Student Visa enquiries include the selected course and destination. The optional email API returns an error if delivery is not configured. Validate inbox delivery before using that API.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
