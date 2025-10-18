"use client";

import { useIsFetching } from "@tanstack/react-query";
import { Icon } from "@/components/UI";

export default function BlockLoading() {
  const fetchPendingCount = useIsFetching({
    predicate: (query) => query.state.status === "pending",
  });

  const isPending = fetchPendingCount > 0;

  if (!isPending) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Icon width={60} height={60} iconName="Loading" className="text-white" />
    </div>
  );
}
