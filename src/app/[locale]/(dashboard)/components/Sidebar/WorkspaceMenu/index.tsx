import { useProjects } from "@/hooks/useProjects";
import { WorkspaceType } from "@/types/workspace";
import useActiveState from "@/store/useActiveState";
import { Button, Icon } from "@/components/UI";
import clsx from "clsx";
import useModal from "@/store/useModal";
import { colorVariant } from "@/functions/colorInterpretation";
import { useTranslations } from "next-intl";

type WorkspaceMenu = {
  workspaces: WorkspaceType[];
};

export default function WorkspaceMenu({ workspaces }: WorkspaceMenu) {
  const { storeActiveWorkspace, storeActiveProject, activeWorkspaceId } =
    useActiveState();

  const { data: projects, isError } = useProjects(activeWorkspaceId);

  const { openModal } = useModal();

  const t = useTranslations();

  return (
    <ul className="menu w-full">
      {workspaces.map(
        ({ id: workspaceId, name: workspaceName, color: workspaceColor }) => (
          <li key={workspaceId}>
            <details open={activeWorkspaceId === workspaceId}>
              <summary
                className={clsx(
                  activeWorkspaceId === workspaceId && "active",
                  "py-3"
                )}
                onClick={() => handleOpenWorkspace(workspaceId)}
              >
                <div className="flex items-center gap-1">
                  {/* delete workspace */}
                  <Button
                    mode="error-bubble"
                    onClick={() => handleDeleteWorkspace(workspaceId)}
                    className="w-3 h-3"
                  />
                  {/* edit workspace */}
                  <Button
                    mode="warning-bubble"
                    onClick={() => handleEditWorkspace(workspaceId)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-4">
                    <Icon
                      iconName="Workspace"
                      width={30}
                      height={30}
                      className={clsx(
                        "text-base-100 p-1 rounded-full",
                        colorVariant(workspaceColor).bg
                      )}
                    />
                    <span>{workspaceName}</span>
                  </div>
                </div>
              </summary>

              {activeWorkspaceId === workspaceId && (
                <ul>
                  {isError && (
                    <li className="text-error p-2 font-bold">
                      {t("Dashboard.serverError")}
                    </li>
                  )}

                  {projects?.map(
                    ({
                      id: projectId,
                      name: projectName,
                      color: projectColor,
                    }) => (
                      <li
                        key={projectId}
                        onClick={() => handleOpenProject(projectId)}
                      >
                        <a className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              iconName="Project"
                              className={clsx(
                                "text-base-100 p-1 rounded-full",
                                colorVariant(projectColor).bg
                              )}
                            />
                            <span>{projectName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* edit project */}
                            <Button
                              mode="warning-bubble"
                              onClick={() => handleEditProject(projectId)}
                              className="w-4 h-4"
                            />
                            {/* delete project */}
                            <Button
                              mode="error-bubble"
                              onClick={() => handleDeleteProject(projectId)}
                              className="w-3 h-3"
                            />
                          </div>
                        </a>
                      </li>
                    )
                  )}

                  {/* create new project */}
                  <Button
                    onClick={() => openModal("create-project")}
                    variant="outline"
                    size="small"
                    className="w-full my-2"
                  >
                    <Icon iconName="SquarePlus" />
                    <span>{t("Dashboard.newProject")}</span>
                  </Button>
                </ul>
              )}
            </details>
          </li>
        )
      )}
    </ul>
  );

  function handleOpenWorkspace(id: string) {
    storeActiveWorkspace(id);
  }

  function handleOpenProject(id: string) {
    storeActiveProject(id);
  }

  function handleEditWorkspace(id: string) {
    storeActiveWorkspace(id);
    openModal("edit-workspace");
  }

  function handleDeleteWorkspace(id: string) {
    storeActiveWorkspace(id);
    openModal("delete-workspace");
  }

  function handleEditProject(id: string) {
    storeActiveProject(id);
    openModal("edit-project");
  }

  function handleDeleteProject(id: string) {
    storeActiveProject(id);
    openModal("delete-project");
  }
}
