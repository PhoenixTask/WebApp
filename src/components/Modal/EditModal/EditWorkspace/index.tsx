import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Input,
  Button,
  ColorPicker,
  ErrorMessage,
  Heading,
} from "@/components/UI";
import { schema, schemaType } from "@/schemas/modals/workspace";
import { useEditWorkspace } from "@/hooks/useWorkspaces";
import Icon from "@/components/Icon";
import useActiveState from "@/store/useActiveState";
import { GetOneWorkspaceAPI } from "@/services/workspace";
import { useEffect } from "react";

interface EditWorkspaceModalProps {
  onClose: () => void;
}

export default function EditWorkspaceModal({
  onClose,
}: EditWorkspaceModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
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

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        ویرایش میزکار
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4">
          <Input withLabel={false} label="نام میزکار" {...register("name")} />
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
            ویرایش
          </Button>
        </div>
      </form>
    </Modal>
  );

  async function onSubmit(data: schemaType) {
    EditWorkspaceAPI({ data, id: activeWorkspaceId! });
    onClose();
  }
}
