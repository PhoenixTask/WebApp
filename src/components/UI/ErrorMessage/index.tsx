import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error: FieldError | undefined;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error) {
    return (
      <p className="mt-1 text-sm relative self-start z-20 shadow-[0_0_5px_#f02236] bg-error before:-z-10 rounded-lg text-base-100 p-2 before:content-[''] before:w-4 before:h-4 before:rotate-45 before:absolute before:-top-[10%] before:right-5 before:bg-error">
        {error.message}
      </p>
    );
  }
  return null;
}
