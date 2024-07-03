import ReceiptEmail from "@/emails/ReceiptEmail";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data } = await resend.emails.send({
    from: "goldmakChallenge <onboarding@resend.dev>",
    to: [body.to],
    subject: body.subject,
    react: ReceiptEmail({
      owner: body.productDetail.owner,
      productDetail: body.productDetail,
    }),
  });

  return NextResponse.json(data);
}
