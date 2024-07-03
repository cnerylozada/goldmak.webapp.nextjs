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
      <div className="mb-4 text-3xl font-bold">AllProducts</div>

      <div className="space-y-8">
        {products.map((_) => (
          <div key={_.id} className="">
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
              <img
                alt=""
                src={_.resourceFiles[0].bucketKey}
                className="h-32 w-full object-cover"
                loading="lazy"
              />

              <div className="bg-white p-4 sm:p-6">
                <Link href={`./products/${_.id}`}>
                  <h3 className="mt-0.5 text-lg text-gray-900">{_.name}</h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {_.price}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};
