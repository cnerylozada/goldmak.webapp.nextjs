/*
  Warnings:

  - You are about to drop the `ResourceFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResourceFile" DROP CONSTRAINT "ResourceFile_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceFile" DROP CONSTRAINT "ResourceFile_productId_fkey";

-- DropTable
DROP TABLE "ResourceFile";

-- CreateTable
CREATE TABLE "OrganizationResourceFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,

    CONSTRAINT "OrganizationResourceFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductResourceFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,

    CONSTRAINT "ProductResourceFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganizationResourceFile" ADD CONSTRAINT "OrganizationResourceFile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductResourceFile" ADD CONSTRAINT "ProductResourceFile_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
