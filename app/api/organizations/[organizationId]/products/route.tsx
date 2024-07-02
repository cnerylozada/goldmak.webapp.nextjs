import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const isValidOrganizationId = await prisma.organization.findUnique({
    where: { id: params.organizationId },
  });
  if (!isValidOrganizationId) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ? +searchParams.get("page")! : 0;
  const PAGE_SIZE = 2;

  const offset = (page - 1) * PAGE_SIZE;
  const dataResponse = await prisma.product.findMany({
    where: {
      organizationId: {
        equals: params.organizationId,
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
