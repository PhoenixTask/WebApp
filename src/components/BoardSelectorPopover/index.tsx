import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type BoardSelectorPopoverProps = {
  anchorRef: React.RefObject<HTMLElement | null>;
  openPopover: boolean;
  boards: { id: string; name: string }[];
  activeBoardId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export default function BoardSelectorPopover({
  anchorRef,
  openPopover,
  boards,
  activeBoardId,
  onSelect,
  onClose,
}: BoardSelectorPopoverProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
  }, [anchorRef, openPopover]);

  useLayoutEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (openPopover) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openPopover]);

  if (!openPopover) return null;

  return createPortal(
    <div
      ref={popoverRef}
      style={{
        top: position.top,
        left: position.left,
      }}
      className="absolute bg-base-100 border rounded-xl shadow-2xl mt-2 z-50 overflow-hidden"
    >
      <ul className="menu">
        {boards.map((board) => (
          <li key={board.id}>
            <button
              onClick={() => {
                onSelect(board.id);
                onClose();
              }}
              className={clsx(
                "rounded-md px-2 py-1 text-sm",
                activeBoardId && ""
              )}
            >
              {board.name}
            </button>
          </li>
        ))}
        {boards.length === 0 && (
          <li className="text-sm text-neutral-500 p-2 text-center">
            هیچ بردی پیدا نشد
          </li>
        )}
      </ul>
    </div>,
    document.body
  );
}
