"use client";

import { Icon } from "@/components/UI";
import useLoading from "@/store/useLoading";

export default function Loading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 bg-black/40 z-50">
      <Icon width={60} height={60} iconName="Loading" className="text-info" />
    </div>
  );
}
