import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductsDetail({
  params,
}: {
  params: { productId: string };
}) {
  const isValidProduct = await prisma.product.findUnique({
    where: { id: params.productId },
  });
  if (!isValidProduct) return notFound();

  return (
    <div>
      <div>Product detail</div>
      <div>{params.productId}</div>
      <div>
        <Link href={`./${params.productId}/checkout`}>checkout</Link>
      </div>
    </div>
  );
}
