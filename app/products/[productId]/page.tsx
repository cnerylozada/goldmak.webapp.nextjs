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
      <div>{JSON.stringify(isValidProduct)}</div>

      <div>
        <Link
          href={`./${params.productId}/checkout`}
          className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-white px-8 py-3">
            Checkout
          </span>
        </Link>
      </div>
    </div>
  );
}
