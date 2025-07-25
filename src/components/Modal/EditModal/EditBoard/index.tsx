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
import { schema, schemaType } from "@/schemas/modals/board";
import Icon from "@/components/Icon";
import { useEditBoard } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";
import { GetOneBoardAPI } from "@/services/board";
import { useEffect, useRef } from "react";

type EditBoardModalProps = {
  onClose: () => void;
};

export default function EditBoardModal({ onClose }: EditBoardModalProps) {
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

  const { activeBoardId } = useActiveState();

  const { mutateAsync: EditBoardAPI } = useEditBoard();

  const orderRef = useRef<number>(0);

  useEffect(() => {
    const getBoardData = async () => {
      const { name, color, order } = await GetOneBoardAPI({
        id: activeBoardId!,
      });

      reset({ name, color });

      orderRef.current = order || 0;
    };
    getBoardData();
  }, [activeBoardId, reset]);

  useEffect(() => {
    const timer = setTimeout(() => setFocus("name"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        ویرایش ستون
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
            ویرایش
          </Button>
        </div>
      </form>
    </Modal>
  );

  async function onSubmit(data: schemaType) {
    EditBoardAPI({
      data: { ...data, order: orderRef.current },
      id: activeBoardId!,
    });
    onClose();
  }
}
