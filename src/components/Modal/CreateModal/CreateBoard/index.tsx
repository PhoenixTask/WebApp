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
import { schema, schemaType } from "@/schemas/modals/board";
import { useCreateBoard } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";
import { useEffect } from "react";

type CreateBoardModalProps = {
  onClose: () => void;
};

export default function CreateBoardModal({ onClose }: CreateBoardModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
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

  const { activeProjectId } = useActiveState();

  const { mutateAsync: CreateBoardAPI } = useCreateBoard();

  useEffect(() => {
    const timer = setTimeout(() => setFocus("name"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        ساخت ستون جدید
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4">
          <Input withLabel={false} label="نام ستون" {...register("name")} />
          <ErrorMessage error={errors.name} />
        </div>

        <div className="form-control mb-4">
          <ColorPicker
            colorName={color}
            setColorName={(newColor) => setValue("color", newColor)}
          />
        </div>

        <div className="modal-action flex justify-center">
          <Button type="submit" size="full" disabled={!isValid}>
            ایجاد
          </Button>
        </div>
      </form>
    </Modal>
  );

  async function onSubmit(data: schemaType) {
    if (!activeProjectId) return;
    CreateBoardAPI({ ...data, projectId: activeProjectId });
    onClose();
  }
}
