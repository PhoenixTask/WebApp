"use client";

import { Button, Input, Flex, Heading, ErrorMessage } from "@/components/UI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, schemaType } from "@/schemas/personalInfo";
import Image from "next/image";
import { useEffect } from "react";
import {
  useUserInfo,
  useEditUserInfo,
  useUploadProfile,
  useGetProfile,
} from "@/hooks/useUser";
import Icon from "@/components/Icon";
import { getUserId } from "@/functions/tokenManager";

export default function PersonalInfoPage() {
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

  const userId = getUserId();
  const { data: userProfileURL } = useGetProfile(userId!);

  useEffect(() => {
    if (!userInfo) return;

    reset({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      username: userInfo.username,
    });
  }, [userInfo, reset]);

  useEffect(() => {
    console.log(userProfileURL);
  }, []);

  return (
    <div className="w-96 mr-14">
      <Heading
        as="h3"
        size="S"
        weight="600"
        className="text-neutral-content mb-9"
      >
        اطلاعات فردی
      </Heading>
      <Flex direction="col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Flex gap="S" className="mb-6">
            <div>
              <div>
                <div className="relative w-20 h-20 overflow-hidden bg-base-300 text-base-content flex justify-center items-center rounded-full">
                  {userProfileURL ? (
                    <Image
                      src={userProfileURL}
                      alt="تصویر پروفایل"
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  ) : (
                    <Icon width={50} height={50} iconName="Profile" />
                  )}
                </div>
              </div>
            </div>
            <Flex direction="col" justifyContent="center" gap="S">
              <label
                className="border border-primary rounded-lg p-2 cursor-pointer grid place-content-center text-xl text-primary"
                htmlFor="img"
              >
                تغییر پروفایل
              </label>
              <input
                hidden
                type="file"
                accept="image/*"
                id="img"
                onChange={handleProfileImageUpload}
              />{" "}
              <span className="text-xs text-neutral">
                این تصویر رو همه می‌تونن ببینن🤭
              </span>
            </Flex>
          </Flex>

          <Flex direction="col" gap="S">
            <Input
              disabled
              label="نام کاربری"
              id="username"
              {...register("username")}
            />
            {/* <ErrorMessage error={errors.username} /> */}

            <Input disabled label="ایمیل" id="email" {...register("email")} />
            {/* <ErrorMessage error={errors.email} /> */}

            <Input
              label="نام"
              id="firstName"
              className={errors.firstName?.message}
              {...register("firstName")}
            />
            <ErrorMessage error={errors.firstName} />

            <Input
              label="نام خانوادگی"
              id="lastName"
              className={errors.lastName?.message}
              {...register("lastName")}
            />
            <ErrorMessage error={errors.lastName} />
          </Flex>

          <div className="relative">
            <Button type="submit" size="full">
              ثبت تغییرات
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
