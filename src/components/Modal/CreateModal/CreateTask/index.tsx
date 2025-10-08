import { useEffect, useRef, useState } from "react";
import {
  Button,
  Heading,
  Input,
  Modal,
  Icon,
} from "@/components/UI";
import { getSchema, schemaType } from "@/schemas/modals/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateTask } from "@/hooks/useTasks";
import PriorityPopover from "@/components/PriorityPopover";
import useActiveState from "@/store/useActiveState";
import PersianDatePicker from "@/components/PersianDatePicker";
import { newDate } from "date-fns-jalali";
import { DateObject } from "react-multi-date-picker";
import { DateToString } from "@/functions/date";
import { useBoards } from "@/hooks/useBoards";
import { useSchema } from "@/hooks/useSchema";
import BoardSelectorPopover from "@/components/BoardSelectorPopover";

type CreateTaskModalProps = {
  onClose: () => void;
  selectedDate?: Date | null;
};

export default function CreateTaskModal({
  onClose,
  selectedDate,
}: CreateTaskModalProps) {
  const { t, schema } = useSchema(getSchema, "Modals.Create.Task");

  const prioritiesLabel = t("priorities").split(",");

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
      description: "",
      priority: 0,
      deadLine: "",
    },
    mode: "onChange",
  });

  const [openBoardPopover, setOpenBoardPopover] = useState(false);
  const boardButtonRef = useRef<HTMLDivElement>(null);

  const [openPopover, setOpenPopover] = useState(false);
  const priorityButtonRef = useRef<HTMLDivElement>(null);

  const priority = watch("priority") ?? 0;

  const priorityColors = [
    "text-neutral",
    "text-success",
    "text-info",
    "text-warning",
    "text-error",
  ];

  const { activeBoardId, storeActiveBoard, activeProjectId } = useActiveState();
  const { mutateAsync: CreateTaskAPI } = useCreateTask();
  const { data: boardsData } = useBoards(activeProjectId);
  const boards = boardsData || [];

  useEffect(() => {
    const timer = setTimeout(() => setFocus("name"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal size="lg" onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        {t("title")}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <div
              ref={boardButtonRef}
              className="px-5 py-2 cursor-pointer shadow border border-base-300 rounded-2xl hover:bg-base-300"
              onClick={() => setOpenBoardPopover((p) => !p)}
            >
              {boards?.find((b) => b.id === activeBoardId)?.name ||
                "انتخاب بورد"}
            </div>

            <BoardSelectorPopover
              anchorRef={boardButtonRef}
              openPopover={openBoardPopover}
              boards={boards}
              activeBoardId={activeBoardId}
              onSelect={(id) => storeActiveBoard(id)}
              onClose={() => setOpenBoardPopover(false)}
            />
          </div>

          <div className="w-52">
            <Input
              withLabel={false}
              label={t("name")}
              {...register("name")}
              error={errors.name}
            />
          </div>
        </div>
        <div className="mb-4">
          <Input
            className="resize-none h-20"
            withLabel={false}
            type="textarea"
            label={t("description")}
            {...register("description")}
            error={errors.description}
          />
        </div>
        <input type="hidden" {...register("priority")} />
        <div className="modal-action flex justify-between relative">
          <div className="relative">
            <div
              className="flex items-center gap-1 p-1 cursor-pointer shadow border border-base-300 rounded-2xl hover:bg-base-300"
              ref={priorityButtonRef}
              onClick={() => setOpenPopover((prev) => !prev)}
            >
              <Icon iconName="Flag" className={priorityColors[priority]} />
              <span className="ml-2">{prioritiesLabel[priority]}</span>
            </div>

            <PriorityPopover
              anchorRef={priorityButtonRef}
              openPopover={openPopover}
              prioritiesLabel={prioritiesLabel}
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
            value={selectedDate && DateToString(selectedDate)}
            onChange={handleDatePickerChange}
          />

          <Button
            type="submit"
            size="small"
            variant="primary"
            disabled={!isValid}
          >
            {t("button")}
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
    await CreateTaskAPI({ ...data, boardId: activeBoardId });

    onClose();
  }
}
