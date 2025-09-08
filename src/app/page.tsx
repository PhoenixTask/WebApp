"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "./loading";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return <LoadingPage />;
}
