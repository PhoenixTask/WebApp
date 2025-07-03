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
import { useCreateWorkspace } from "@/hooks/useWorkspaces";
import Icon from "@/components/Icon";

interface CreateWorkspaceModalProps {
  onClose: () => void;
}

export default function CreateWorkspaceModal({
  onClose,
}: CreateWorkspaceModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "stone",
    },
    mode: "onChange",
  });

  const color = watch("color");

  const { mutateAsync: CreateWorkspaceAPI } = useCreateWorkspace();

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        ساخت میزکار جدید
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
            ایجاد
          </Button>
        </div>
      </form>
    </Modal>
  );

  async function onSubmit(data: schemaType) {
    CreateWorkspaceAPI(data);
    onClose();
  }
}
