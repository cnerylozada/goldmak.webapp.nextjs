import prisma from "@/prisma/client";
import { organizationSchema } from "@/validations/organizations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  const body = await request.json();
  const validation = organizationSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const creatorId = params.creatorId;

  const creator = await prisma.user.findUnique({ where: { id: creatorId } });
  if (!creator) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  const newOrganization = await prisma.organization.create({
    data: {
      user: {
        connect: { id: creatorId },
      },
      name: body.name,
      description: body.description,
    },
  });
  return NextResponse.json(newOrganization, { status: 201 });
}
