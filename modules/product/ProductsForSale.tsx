import prisma from "@/prisma/client";

export const ProductsForSale = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      organization: {
        select: { resourceFiles: { select: { bucketKey: true } } },
      },
      resourceFiles: { select: { bucketKey: true } },
    },
  });

  return (
    <div>
      <div>AllProducts</div>
      <div>
        {products.map((_) => (
          <div key={_.id}>
            <div>{_.id}</div>
            <div>{_.name}</div>
            <div>{_.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
