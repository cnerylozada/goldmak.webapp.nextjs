import prisma from "@/prisma/client";
import { organizationSchema } from "@/validations/organizations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  const isValidCreatorId = await prisma.user.findUnique({
    where: { id: params.creatorId },
  });
  if (!isValidCreatorId) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ? +searchParams.get("page")! : 0;
  const PAGE_SIZE = 2;
  const offset = (page - 1) * PAGE_SIZE;
  const dataResponse = await prisma.organization.findMany({
    where: {
      userId: {
        equals: params.creatorId,
      },
    },
    include: {
      resourceFiles: {
        select: {
          bucketKey: true,
        },
      },
    },
    skip: offset,
    take: PAGE_SIZE,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(dataResponse, { status: 201 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  const body = await request.json();
  const validation = organizationSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const creatorId = params.creatorId;
  const isValidCreatorId = await prisma.user.findUnique({
    where: { id: creatorId },
  });
  if (!isValidCreatorId) {
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
