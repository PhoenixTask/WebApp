import { Icon } from "@/components/UI";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PriorityPopoverType = {
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onSelect: (val: number) => void;
  openPopover: boolean;
  prioritiesLabel: string[];
};

export default function PriorityPopover({
  anchorRef,
  onClose,
  onSelect,
  openPopover = false,
  prioritiesLabel,
}: PriorityPopoverType) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  const colors = [
    "text-neutral",
    "text-success",
    "text-info",
    "text-warning",
    "text-error",
  ];

  useLayoutEffect(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [anchorRef]);

  return createPortal(
    openPopover && (
      <div
        ref={popoverRef}
        style={{
          top: position.top,
          left: position.left,
        }}
        className="absolute bg-base-100 overflow-hidden rounded-xl shadow-2xl border mt-2 z-50"
        onClick={onClose}
      >
        <ul className="menu">
          {prioritiesLabel.map((label, index) => (
            <li key={index} onClick={() => onSelect(index)}>
              <a>
                <Icon iconName="Flag" className={colors[index]} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
    document.body
  );
}
