import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Input,
  Button,
  ColorPicker,
  Heading,
  Icon,
} from "@/components/UI";
import { getSchema, schemaType } from "@/schemas/modals/project";
import { useCreateProject } from "@/hooks/useProjects";
import useActiveState from "@/store/useActiveState";
import { useEffect } from "react";
import { useSchema } from "@/hooks/useSchema";

type CreateProjectModalProps = {
  onClose: () => void;
};

export default function CreateProjectModal({
  onClose,
}: CreateProjectModalProps) {
  const { t, schema } = useSchema(getSchema, "Modals.Create.Project");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    setFocus,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "stone",
    },
    mode: "onChange",
  });

  const color = watch("color");

  const { activeWorkspaceId } = useActiveState();

  const { mutateAsync: CreateProjectAPI } = useCreateProject();

  useEffect(() => {
    const timer = setTimeout(() => setFocus("name"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        {t("title")}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            withLabel={false}
            label={t("name")}
            {...register("name")}
            error={errors.name}
          />
        </div>

        <div className="mb-4">
          <ColorPicker
            colorName={color}
            setColorName={(newColor) => setValue("color", newColor)}
          />
        </div>

        <div className="modal-action flex justify-center">
          <Button
            type="submit"
            size="full"
            variant="primary"
            disabled={!isValid}
          >
            {t("button")}
          </Button>
        </div>
      </form>
    </Modal>
  );

  async function onSubmit(data: schemaType) {
    if (!activeWorkspaceId) return;
    CreateProjectAPI({ ...data, workspaceId: activeWorkspaceId });
    onClose();
  }
}
