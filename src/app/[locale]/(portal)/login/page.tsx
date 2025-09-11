"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, schemaType } from "@/schemas/login";
import { Button, Flex, Heading, Input, ErrorMessage } from "@/components/UI";
import errorToast from "@/functions/errorToast";
import { useAuth } from "@/hooks/useUser";
import { useEffect } from "react";
import { useSchema } from "@/hooks/useSchema";
import { direction } from "@/functions/languageHandler";

export default function LoginPage() {
  const router = useRouter();

  const { t, locale, schema } = useSchema(getSchema, "Portal");

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<schemaType>({ resolver: zodResolver(schema) });
  const { loginHandler, isLoading } = useAuth();

  useEffect(() => {
    setFocus("username");
  }, []);

  return (
    <div className="backdrop-blur-md text-base-content bg-base-100/60 max-w-xl w-full shadow-xl p-6 rounded-3xl">
      <Heading align="center" className="mb-8" as="h2" size="S">
        {t("Login.welcome")}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={`${errors ? "XS" : "L"}`} direction="col">
          <Flex gap={`${errors ? "XS" : "M"}`} direction="col">
            <Input
              id="username"
              label={t("userName")}
              {...register("username")}
            />
            <ErrorMessage {...direction(locale)} error={errors.username} />

            <Flex direction="col">
              <Input
                {...register("password")}
                id="password"
                type="password"
                label={t("password")}
              />
              <ErrorMessage {...direction(locale)} error={errors.password} />
            </Flex>
          </Flex>
          <Flex gap="M" direction="col">
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              size="full"
              className="h-11"
            >
              {t("Login.title")}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );

  async function onSubmit(formData: schemaType) {
    await loginHandler(formData, {
      onSuccess: () => {
        toast.success("ورود با موفقیت انجام شد");
        router.push(`/${locale}/list`);
      },
      onError: (err) => {
        errorToast(err);
      },
    });
  }
}
