"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, schemaType } from "@/schemas/register";
import { Button, Flex, Heading, Input, ErrorMessage } from "@/components/UI";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";
import { useAuth } from "@/hooks/useUser";
import { chooseRandomName } from "@/functions/chooseRandomName";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<schemaType>({ resolver: zodResolver(schema) });
  const { registerHandler, isLoading } = useAuth();

  useEffect(() => {
    setFocus("username");
  }, []);

  return (
    <div className="backdrop-blur-md text-base-content bg-base-100/60 max-w-xl w-full shadow-xl p-6 rounded-3xl">
      <Heading align="center" className="mb-8" as="h2" size="S">
        به جمع فونیکس تسکی‌ها بپیوند😎
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={`${errors ? "XS" : "M"}`} direction="col">
          <Input id="username" label="نام کاربری" {...register("username")} />
          <ErrorMessage error={errors.username} />

          <Input id="email" label="ایمیل" type="email" {...register("email")} />
          <ErrorMessage error={errors.email} />

          <Input
            id="password"
            label="رمز عبور"
            type="password"
            {...register("password")}
          />
          <ErrorMessage error={errors.password} />

          <Input
            id="confirmPassword"
            label="تکرار رمز عبور"
            type="password"
            {...register("confirmPassword")}
          />
          <ErrorMessage error={errors.confirmPassword} />

          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            size="full"
            className="h-11"
          >
            ثبت‌نام
          </Button>
        </Flex>
      </form>
    </div>
  );

  async function onSubmit(formData: schemaType) {
    const { firstName, lastName } = chooseRandomName();
    const registerData = { ...formData, firstName, lastName };

    await registerHandler(registerData, {
      onSuccess: async () => {
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/login");
      },
      onError: (err) => {
        errorToast(err);
      },
    });
  }
}
