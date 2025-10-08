"use client";

import { Button, Input, Flex, ErrorMessage } from "@/components/UI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, schemaType } from "@/schemas/personalInfo";
import Image from "next/image";
import { useEffect } from "react";
import {
  useUserInfo,
  useEditUserInfo,
  useUploadProfile,
  useGetProfile,
} from "@/hooks/useUser";
import { direction } from "@/functions/languageHandler";
import { useSchema } from "@/hooks/useSchema";
import { useProtect } from "@/providers/ProtectContext";
import { useRouter } from "next/navigation";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { isAuthenticated } = useProtect();

  const { t, locale, schema } = useSchema(getSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const { data: userInfo } = useUserInfo();

  const { mutateAsync: EditUserInfoAPI } = useEditUserInfo();

  const { mutateAsync: UploadProfileAPI } = useUploadProfile();

  const { data: userProfileURL } = useGetProfile(userInfo?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!userInfo) return;

    reset({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      username: userInfo.username,
    });
  }, [userInfo, reset]);

  return (
    <div className="w-96 mr-14">
      <Flex direction="col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Flex gap="S" className="mb-6">
            <div>
              <div>
                <div className="relative w-20 h-20 overflow-hidden bg-base-300 text-base-content flex justify-center items-center rounded-full">
                  {userProfileURL && (
                    <Image
                      src={userProfileURL}
                      alt={t("altProfileImage")}
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <Flex direction="col" justifyContent="center" gap="S">
              <label
                className="border border-primary rounded-lg p-2 cursor-pointer grid place-content-center text-xl text-primary"
                htmlFor="img"
              >
                {t("Profile.changeProfile")}
              </label>
              <input
                hidden
                type="file"
                accept="image/*"
                id="img"
                onChange={handleProfileImageUpload}
              />{" "}
              <span className="text-xs text-neutral">
                {t("Profile.profileSubWarning")}
              </span>
            </Flex>
          </Flex>

          <Flex {...direction(locale)} direction="col" gap="S">
            <Input
              disabled
              label={t("Profile.userName")}
              id="username"
              {...register("username")}
            />
            {/* <ErrorMessage error={errors.username} /> */}

            <Input
              disabled
              label={t("Profile.email")}
              id="email"
              {...register("email")}
            />
            {/* <ErrorMessage error={errors.email} /> */}

            <Input
              label={t("Profile.firstName")}
              id="firstName"
              className={errors.firstName?.message}
              {...register("firstName")}
            />
            <ErrorMessage {...direction(locale)} error={errors.firstName} />

            <Input
              label={t("Profile.lastName")}
              id="lastName"
              className={errors.lastName?.message}
              {...register("lastName")}
            />
            <ErrorMessage {...direction(locale)} error={errors.lastName} />
          </Flex>

          <div className="relative">
            <Button type="submit" size="full">
              {t("Profile.confirmButton")}
            </Button>
          </div>
        </form>
      </Flex>
    </div>
  );

  function handleProfileImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      UploadProfileAPI(file);
    }
  }

  function onSubmit(data: schemaType) {
    const { firstName, lastName } = data;
    EditUserInfoAPI({ firstName, lastName });
  }
}
