"use client";
import { ProductType, productSchema } from "@/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductType>({
    mode: "all",
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => console.log(data);

  return (
    <div>
      <div>CreateProductForm</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}

        <input {...register("price")} />

        <input type="submit" />
      </form>
    </div>
  );
};
