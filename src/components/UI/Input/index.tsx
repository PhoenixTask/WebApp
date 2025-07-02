import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { fontSize } from "../sharedStyles";
import clsx from "clsx";

type CommonProps = {
  label: string;
  withLabel?: false;
  textSize?: keyof typeof fontSize;
  type?: "text" | "email" | "password" | "textarea";
};

type InputProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "as">;

type TextareaProps = CommonProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "as">;

type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      className = "",
      type = "text",
      withLabel = true,
      label,
      textSize = "S",
      ...rest
    },
    ref
  ) => {
    const inputId = withLabel ? (rest as any).id : undefined;

    const commonProps = {
      ref,
      id: inputId,
      className: clsx(
        "outline-none py-2 px-3 rounded-md border transition-color duration-300",
        rest.disabled
          ? "border-neutral"
          : "border-primary/50 focus:border-primary",
        className
      ),
      placeholder: !withLabel ? label : "",
      ...rest,
    };

    return (
      <div className="w-full flex flex-col gap-2 select-none">
        {withLabel && inputId && (
          <label
            className={clsx("block", fontSize[textSize])}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        {type === "textarea" ? (
          <textarea
            {...(commonProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={type}
            {...(commonProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "My Custom Input";
export default Input;
