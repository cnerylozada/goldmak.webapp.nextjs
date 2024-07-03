import prisma from "@/prisma/client";
import Link from "next/link";

export const ProductsForSale = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      resourceFiles: { select: { bucketKey: true } },
    },
  });

  return (
    <div>
      <div>AllProducts</div>
      <div>
        {products.map((_) => (
          <div key={_.id}>
            <div>
              <Link href={`./products/${_.id}`}>{_.id}</Link>
            </div>
            <div>{_.name}</div>
            <div>{_.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
