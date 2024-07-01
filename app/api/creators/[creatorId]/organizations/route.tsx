import { IBaseOrganization } from "@/models/models";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  const body: Omit<IBaseOrganization, "creatorId"> = await request.json();
  const creatorId = params.creatorId;

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
