import { ButtonHTMLAttributes, forwardRef } from "react";
import { fontWeight, fontSize } from "../sharedStyles";
import { clsx } from "clsx";

const variantStyles = {
  primary: "bg-primary hover:bg-primary/80 text-primary-content",
  secondary: "bg-secondary hover:bg-secondary/70 text-secondary-content",
  outline:
    "border-2 border-primary hover:border-primary/70 text-primary hover:text-primary/70",
  ghost: "bg-transparent hover:bg-base-300 text-base-content",
  destructive: "bg-error/60 hover:bg-error text-base-100",
};

const sizeStyles = {
  default: "py-2 px-4",
  full: "w-full py-3",
  small: "w-32 py-1 text-sm",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode?: "warning-bubble" | "error-bubble" | "child";
  loading?: boolean;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  textSize?: keyof typeof fontSize;
  weight?: keyof typeof fontWeight;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      mode,
      className = "",
      children,
      variant = "primary",
      size = "default",
      textSize = "S",
      weight = "800",
      type = "button",
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      "inline-flex items-center justify-center gap-1 rounded-md font-black transition-all duration-300 cursor-pointer select-none",
      variantStyles[variant],
      sizeStyles[size],
      fontSize[textSize],
      fontWeight[weight],
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      className
    );

    const content = (
      <>
        {loading ? (
          <span className="loading loading-infinity loading-sm" />
        ) : (
          <>{children}</>
        )}
      </>
    );

    switch (mode) {
      case "error-bubble":
        return (
          <div className="tooltip flex" data-tip={props["aria-label"]}>
            <button
              type={type}
              className={clsx(
                "cursor-pointer transition-colors duration-300 rounded-full bg-error/60 hover:bg-error",
                className
              )}
              {...props}
            />
          </div>
        );
      case "warning-bubble":
        return (
          <div className="tooltip flex" data-tip={props["aria-label"]}>
            <button
              type={type}
              className={clsx(
                "cursor-pointer transition-colors duration-300 rounded-full bg-warning/60 hover:bg-warning",
                className
              )}
              {...props}
            />
          </div>
        );
      case "child":
        return (
          <button
            type={type}
            className={clsx("cursor-pointer", className)}
            {...props}
          >
            {children}
          </button>
        );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
