import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Input,
  Button,
  ColorPicker,
  ErrorMessage,
  Heading,
  Icon,
} from "@/components/UI";
import { getSchema, schemaType } from "@/schemas/modals/workspace";
import { useEditWorkspace } from "@/hooks/useWorkspaces";
import useActiveState from "@/store/useActiveState";
import { GetOneWorkspaceAPI } from "@/services/workspace";
import { useEffect } from "react";
import { useSchema } from "@/hooks/useSchema";

type EditWorkspaceModalProps = {
  onClose: () => void;
};

export default function EditWorkspaceModal({
  onClose,
}: EditWorkspaceModalProps) {
  const { t, schema } = useSchema(getSchema, "Modals.Edit.Workspace");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    setFocus,
    reset,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const color = watch("color");

  const { activeWorkspaceId } = useActiveState();
  const { mutateAsync: EditWorkspaceAPI } = useEditWorkspace();

  useEffect(() => {
    const getWorkspaceData = async () => {
      const { name, color } = await GetOneWorkspaceAPI({
        id: activeWorkspaceId!,
      });
      reset({ name, color });
    };
    getWorkspaceData();
  }, [activeWorkspaceId, reset]);

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
        <div className="form-control mb-4">
          <Input withLabel={false} label={t("name")} {...register("name")} />
          <ErrorMessage error={errors.name} />
        </div>

        <div className="form-control mb-4">
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
    EditWorkspaceAPI({
      data: { name: data.name, description: data.color },
      id: activeWorkspaceId!,
    });
    onClose();
  }
}
