"use client";
import { ProductType, productSchema } from "@/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductType>({
    mode: "all",
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    reset({ name: "samsung", stock: 1, price: 45.69 });
  }, []);

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    const product = { ...data, price: +data.price };
    console.log(product);
  };

  return (
    <div>
      <div>CreateProductForm</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}

        <input {...register("price")} />
        {errors.price && <div>{errors.price.message as string}</div>}

        <input type="number" {...register("stock")} />
        {errors.stock && <div>{errors.stock.message}</div>}

        <input type="submit" />
      </form>
    </div>
  );
};
