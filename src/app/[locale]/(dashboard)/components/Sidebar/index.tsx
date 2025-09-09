"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flex, Link, Button, Icon } from "@/components/UI";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import WorkspaceMenu from "./WorkspaceMenu";
import useModal from "@/store/useModal";
import { useGetProfile, useUserInfo } from "@/hooks/useUser";
import { getUserId, removeTokens } from "@/functions/tokenManager";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import PhoenixTask from "@/components/PhoenixTask";

export default function DashboardSidebar() {
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { openModal } = useModal();

  const { data: workspaces, isLoading, isError } = useWorkspaces();

  const userId = getUserId();
  const { data: userProfileURL } = useGetProfile(userId!);

  const { data: userInfo } = useUserInfo();

  return (
    <Flex
      direction="col"
      justifyContent="between"
      alignItems="center"
      className="h-screen overflow-hidden py-10 shadow-lg border-l border-neutral"
    >
      <div className="flex flex-col justify-center gap-2 w-72">
        <PhoenixTask /> 

        {/* create new workspace */}
        <Button
          onClick={() => openModal("create-workspace")}
          variant="primary"
          size="full"
          className="flex items-center"
        >
          <Icon iconName="SquarePlus" />
          <span>ایجاد میزکار جدید</span>
        </Button>

        <div
          className="h-[670px] overflow-y-auto"
          dir="ltr"
          style={{ scrollbarGutter: "stable" }}
        >
          <div dir="rtl">
            {/* Loading/Error */}
            {isLoading && <Icon iconName="Loading" />}
            {isError && (
              <div className="flex flex-col items-center mt-10 font-bold text-error">
                <span>اوپس...😵‍💫</span>
                <span>نمی‌تونم به سرور متصل بشم</span>
              </div>
            )}
            {workspaces && <WorkspaceMenu workspaces={workspaces} />}
          </div>
        </div>
      </div>

      <div>
        <Link
          i18n
          className="flex items-center gap-2"
          weight="800"
          textSize="M"
          to="/personal-info"
        >
          <div className="relative w-10 h-10 overflow-hidden bg-base-300 text-base-content flex justify-center items-center rounded-full">
            {userProfileURL && (
              <Image
                src={userProfileURL}
                alt="تصویر پروفایل"
                width={100}
                height={100}
                className="object-cover"
              />
            )}
          </div>

          {userInfo && userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : "بی‌نام و نشان"}
        </Link>

        <Button
          mode="child"
          className="w-fit mt-5 flex items-center gap-2 text-base font-extrabold text-error hover:text-error/60 transition-colors duration-300"
          onClick={logoutHandler}
        >
          <Icon width={16} iconName="Logout" />
          خروج
        </Button>
      </div>
    </Flex>
  );

  function logoutHandler() {
    queryClient.clear();
    removeTokens();
    router.push(`/${locale}/login`);
  }
}
