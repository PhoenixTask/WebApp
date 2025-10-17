"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, schemaType } from "@/schemas/login";
import { Button, Flex, Heading, Input } from "@/components/UI";
import { useEffect, useState } from "react";
import { useSchema } from "@/hooks/useSchema";
import { useProtect } from "@/providers/ProtectContext";
import GoogleAuth from "@/components/GoogleAuth";

export default function LoginPage() {
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  const { t, locale, schema } = useSchema(getSchema, "Portal");

  const { isAuthenticated, loginFunction, isLoading } = useProtect();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<schemaType>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${locale}/list`);
    } else {
      setChecking(false);
    }
  }, [router]);

  useEffect(() => {
    setFocus("username");
  }, []);

  if (checking) {
    return null;
  }

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
              error={errors.username}
            />

            <Flex direction="col">
              <Input
                {...register("password")}
                id="password"
                type="password"
                label={t("password")}
                error={errors.password}
              />
            </Flex>

            <Flex justifyContent="center">
              <GoogleAuth />
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

  function onSubmit(formData: schemaType) {
    loginFunction(formData, locale);
  }
}
