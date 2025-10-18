"use client";

import Image from "next/image";
import { Flex, Link, Button, Icon } from "@/components/UI";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import WorkspaceMenu from "./WorkspaceMenu";
import useModal from "@/store/useModal";
import { useGetProfile, useUserInfo } from "@/hooks/useUser";
import { useLocale, useTranslations } from "next-intl";
import PhoenixTask from "@/components/PhoenixTask";
import { useProtect } from "@/providers/ProtectContext";
import { direction } from "@/functions/languageHandler";

export default function DashboardSidebar() {
  const { logout } = useProtect();
  const { openModal } = useModal();
  const locale = useLocale();
  const t = useTranslations();

  const { data: workspaces, isLoading, isError } = useWorkspaces();
  const { data: userInfo } = useUserInfo();
  const { data: userProfileURL } = useGetProfile(userInfo?.id);

  const fullName =
    userInfo?.firstName && userInfo?.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`
      : t("Dashboard.noName");

  return (
    <Flex
      dir="ltr"
      direction="col"
      justifyContent="between"
      alignItems="center"
      className="h-screen w-72"
    >
      {/* Header Section(Logo & New Workspace) */}
      <div className="flex flex-col justify-center w-full p-4 gap-4">
        <div className="flex justify-center mb-2">
          <PhoenixTask />
        </div>

        <Button
          onClick={() => openModal("create-workspace")}
          variant="primary"
          size="full"
          className="flex items-center justify-center gap-2"
        >
          <Icon iconName="SquarePlus" />
          <span>{t("Dashboard.newWorkspace")}</span>
        </Button>
      </div>

      {/* Main Section(Workspaces & Projects) */}
      <div
        className="flex-1 w-full overflow-y-auto px-3"
        dir="ltr"
        style={{ scrollbarGutter: "stable" }}
      >
        <div dir="rtl" className="pb-20">
          {isLoading && (
            <div className="flex justify-center py-10">
              <Icon iconName="Loading" className="animate-spin" />
            </div>
          )}
          {isError && (
            <div
              {...direction(locale)}
              className="mt-10 font-bold text-error text-center"
            >
              {t("Dashboard.serverError")}
            </div>
          )}
          {workspaces && <WorkspaceMenu workspaces={workspaces} />}
        </div>
      </div>

      {/* Footer Section (Profile + Logout) */}
      <div className="w-full pb-10 px-5 flex flex-col justify-center items-center">
        <Link
          i18n
          className="flex items-center gap-3 hover:bg-base-300/30 p-2 rounded-xl transition-all duration-200"
          weight="800"
          textSize="M"
          to="/personal-info"
        >
          <div className="relative w-10 h-10 overflow-hidden bg-primary-content text-base-content flex justify-center items-center rounded-full ring-2 ring-primary/30">
            {userProfileURL && (
              <Image
                src={userProfileURL}
                alt={t("altProfileImage")}
                width={100}
                height={100}
                className="object-cover"
              />
            )}
          </div>
          <span className="truncate font-semibold">{fullName}</span>
        </Link>

        <Button
          mode="child"
          className="mt-4 flex items-center gap-2 text-error font-bold"
          onClick={logout}
        >
          <Icon width={16} iconName="Logout" />
          {t("logoutLink")}
        </Button>
      </div>
    </Flex>
  );
}
