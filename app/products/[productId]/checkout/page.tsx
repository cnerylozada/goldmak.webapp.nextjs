import { auth } from "@/auth";
import { CheckoutForm } from "@/modules/checkout/CheckoutForm";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";

export default async function CheckoutProduct({
  params,
}: {
  params: { productId: string };
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const isValidProduct = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      resourceFiles: { select: { bucketKey: true } },
    },
  });
  if (!isValidProduct) return notFound();

  return (
    <div>
      <div>Checkout detail</div>
      <div>{params.productId}</div>
      <div>{session.user?.email}</div>
      <CheckoutForm
        product={isValidProduct}
        user={{
          email: session.user?.email!,
          id: session.user?.id!,
          name: session.user?.name!,
        }}
      />
    </div>
  );
}
