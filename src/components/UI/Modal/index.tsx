"use client";
import Button from "../Button";
import clsx from "clsx";

type ModalProps = {
  children: React.ReactNode;
  closeIcon?: React.ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "w-80 max-w-sm",
  md: "w-11/12 max-w-md",
  lg: "w-11/12 max-w-3xl",
  xl: "w-full max-w-5xl",
};

export default function Modal({
  children,
  onClose,
  closeIcon,
  size = "md",
}: ModalProps) {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className="modal modal-open fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div className={clsx("modal-box relative", sizeClasses[size])}>
        {closeIcon && (
          <Button
            mode="child"
            className="absolute top-1.5 right-1.5 group hover:text-error"
            onClick={onClose}
          >
            <span className="inline-block transform transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110">
              {closeIcon}
            </span>
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
