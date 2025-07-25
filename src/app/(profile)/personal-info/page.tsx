"use client";

import { Button, Input, Flex, Heading, ErrorMessage } from "@/components/UI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, schemaType } from "@/schemas/personalInfo";
import { useEffect } from "react";
import { useUserInfo, useEditUserInfo } from "@/hooks/useUser";
import Icon from "@/components/Icon";

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

  useEffect(() => {
    if (!userInfo) return;

    reset({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      username: userInfo.username,
    });
  }, [userInfo]);

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
              <Flex
                justifyContent="center"
                alignItems="center"
                className="overflow-hidden bg-base-300 text-base-content rounded-full text-2xl p-2"
              >
                <Icon width={50} height={50} iconName="Profile" />
              </Flex>
            </div>
            <Flex direction="col" justifyContent="center" gap="S">
              <label
                className="border border-primary rounded-lg p-2 cursor-pointer grid place-content-center text-xl text-primary"
                htmlFor="img"
              >
                ویرایش تصویر پروفایل
              </label>
              <input hidden type="file" id="img" />
              <span className="text-xs text-neutral">
                این تصویر برای عموم قابل نمایش است.
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

  function onSubmit(data: schemaType) {
    const { firstName, lastName } = data;
    EditUserInfoAPI({ firstName, lastName });
  }
}
