import { direction } from "@/functions/languageHandler";
import { useLocale } from "next-intl";
import { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  error: FieldError | undefined;
};

export default function ErrorMessage({ error, ...rest }: ErrorMessageProps) {
  const locale = useLocale();
  if (error) {
    return (
      <p
        className="absolute top-full mt-1 right-0 text-sm z-20 shadow-[0_0_5px_#f02236] bg-error rounded-lg text-base-100 p-2 before:content-[''] before:w-3 before:h-3 before:rotate-45 before:absolute before:-top-1 before:right-5 before:bg-error"
        {...direction(locale)}
        {...rest}
      >
        {error.message}
      </p>
    );
  }
  return null;
}
