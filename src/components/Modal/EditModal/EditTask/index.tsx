import { useEffect, useRef, useState } from "react";
import {
  Button,
  ErrorMessage,
  Heading,
  Input,
  Modal,
  Icon,
} from "@/components/UI";
import { schema, schemaType } from "@/schemas/modals/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEditTask } from "@/hooks/useTasks";
import PriorityPopover from "@/components/PriorityPopover";
import useActiveState from "@/store/useActiveState";
import PersianDatePicker from "@/components/PersianDatePicker";
import { newDate } from "date-fns-jalali";
import { DateObject } from "react-multi-date-picker";
import { DateToString, ChangeFormStrDate } from "@/functions/date";
import { priorityLabel } from "@/constants";
import { GetOneTaskAPI } from "@/services/task";

type EditTaskModalProps = {
  onClose: () => void;
};

export default function EditTaskModal({ onClose }: EditTaskModalProps) {
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

  const [openPopover, setOpenPopover] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const priority = watch("priority") ?? 0;
  const deadLine = watch("deadLine");

  const priorityColors = [
    "text-neutral",
    "text-success",
    "text-info",
    "text-warning",
    "text-error",
  ];

  const { activeTaskId, activeBoardId } = useActiveState();
  const { mutateAsync: EditTaskAPI } = useEditTask();

  const orderRef = useRef<number>(0);

  useEffect(() => {
    const getTaskData = async () => {
      const { name, description, priority, deadLine, order } =
        await GetOneTaskAPI({
          id: activeTaskId!,
        });

      orderRef.current = order || 0;

      reset({
        name,
        description,
        priority,
        deadLine: ChangeFormStrDate(deadLine),
      });
    };
    if (activeTaskId) {
      getTaskData();
    }
  }, [activeTaskId, reset]);

  useEffect(() => {
    const timer = setTimeout(() => setFocus("name"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal size="lg" onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        ویرایش تسک
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4 w-52">
          <Input withLabel={false} label="عنوان تسک" {...register("name")} />
          <ErrorMessage error={errors.name} />
        </div>
        <div className="form-control mb-4">
          <Input
            className="resize-none h-20"
            withLabel={false}
            type="textarea"
            label="توضیحات تسک"
            {...register("description")}
          />
          <ErrorMessage error={errors.description} />
        </div>
        <input type="hidden" {...register("priority")} />
        <div className="modal-action flex justify-between relative">
          <div className="relative">
            <div
              className="flex items-center gap-1 p-1 cursor-pointer shadow border border-base-300 rounded-2xl hover:bg-base-300"
              ref={buttonRef}
              onClick={() => setOpenPopover((prev) => !prev)}
            >
              <Icon iconName="Flag" className={priorityColors[priority]} />
              <span className="ml-2">{priorityLabel[priority]}</span>
            </div>

            <PriorityPopover
              anchorRef={buttonRef}
              openPopover={openPopover}
              onClose={() => setOpenPopover(false)}
              onSelect={(val) => {
                setValue("priority", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setOpenPopover(false);
              }}
            />
          </div>
          <PersianDatePicker
            value={deadLine}
            onChange={handleDatePickerChange}
          />
          <Button
            type="submit"
            size="small"
            variant="primary"
            disabled={!isValid}
          >
            ویرایش
          </Button>
        </div>
      </form>
    </Modal>
  );

  function handleDatePickerChange({
    year,
    month,
    day,
    hour,
    minute,
  }: DateObject) {
    const miladiDate = newDate(year, month.index, day, hour, minute);
    const miladiString = DateToString(miladiDate);

    setValue("deadLine", miladiString, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  async function onSubmit(data: schemaType) {
    if (!activeBoardId) return;

    EditTaskAPI({
      data: {
        ...data,
        boardId: activeBoardId,
        description: data.description || "",
      },
      id: activeTaskId!,
    });

    onClose();
  }
}
