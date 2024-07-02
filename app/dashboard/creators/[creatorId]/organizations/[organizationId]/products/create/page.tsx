import { CreateProductForm } from "@/modules/product/CreateProductForm";

export default function CreateProductPage({
  params,
}: {
  params: { creatorId: string; organizationId: string };
}) {
  return (
    <div className="">
      <div>CreateProductPage</div>
      <CreateProductForm organizationId={params.organizationId} />
    </div>
  );
}
