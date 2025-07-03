"use client";

import { Button, Heading } from "@/components/UI";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content p-4">
      <div className="card w-full max-w-lg bg-base-300 shadow-xl p-8 text-center">
        <div className="card-body items-center text-center">
          <Heading
            as="h2"
            size="XL"
            className="card-title font-extrabold text-error"
          >
            404
          </Heading>
          <Heading as="h1" className="text-3xl font-semibold mb-4">
            این صفحه وجود نداره!😓
          </Heading>
          <div className="card-actions justify-center">
            <Button
              className="btn btn-primary btn-lg"
              onClick={() => router.back()}
            >
              بازگشت به صفحه‌ی قبل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
