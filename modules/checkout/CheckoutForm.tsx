"use client";

import { Product } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

export const CheckoutForm = ({
  product,
  user,
}: {
  product: Product;
  user: { email: string; id: string };
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ productName: string }>({ mode: "all" });
  const router = useRouter();

  const onSubmit: SubmitHandler<{ productName: string }> = async (data) => {
    console.log("data", user.email);
    router.push("/");
  };

  return (
    <div>
      <div>{JSON.stringify(product)}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("productName")} />

        <button
          type="submit"
          disabled={!isValid}
          className="bg-green-400 disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
