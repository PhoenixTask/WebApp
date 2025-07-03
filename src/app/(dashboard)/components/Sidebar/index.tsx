"use client";

import { useRouter } from "next/navigation";
import { Flex, Link, Button, Heading } from "@/components/UI";
import Icon from "@/components/Icon";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import WorkspaceMenu from "./WorkspaceMenu";
import useModal from "@/store/useModal";
import { useUserInfo } from "@/hooks/useUser";
import { removeTokens } from "@/functions/tokenManager";

export default function DashboardSidebar() {
  const router = useRouter();
  const { openModal } = useModal();

  const { data: workspaces, isLoading, isError, error } = useWorkspaces();

  const { data: userInfo } = useUserInfo();

  const clickProfile = () => {
    removeTokens();
    router.push("/login");
  };

  return (
    <Flex
      direction="col"
      justifyContent="between"
      alignItems="center"
      className="h-screen py-10 shadow-lg border-l border-neutral"
    >
      <div className="flex flex-col justify-center gap-2 w-72">
        <Heading
          as="h1"
          size="XS"
          className="flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary select-none"
        >
          فونیکس تسک
        </Heading>

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

        {workspaces && <WorkspaceMenu workspaces={workspaces} />}
      </div>

      {/* Loading/Error */}
      {isLoading && <Icon iconName="Loading" />}
      {isError && (
        <div className="flex flex-col items-center font-bold text-error">
          <span>اوپس...😵‍💫</span>
          <span>نمی‌تونم به سرور متصل بشم</span>
        </div>
      )}

      <div>
        <Link
          className="flex items-center gap-2"
          weight="800"
          textSize="M"
          to="/personal-info"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            className="overflow-hidden bg-base-300 text-base-content rounded-full text-2xl p-2"
          >
            <Icon iconName="Profile" />
          </Flex>

          {userInfo && userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : "بی‌نام و نشان"}
        </Link>

        <Button
          mode="child"
          className="w-fit mt-5 flex items-center gap-2 text-base font-extrabold text-error hover:text-error/60 transition-colors duration-300"
          onClick={clickProfile}
        >
          <Icon width={16} iconName="Logout" />
          خروج
        </Button>
      </div>
    </Flex>
  );
}
