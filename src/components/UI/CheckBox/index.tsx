import { forwardRef, InputHTMLAttributes } from "react";
import { Icon } from "..";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  connectorId: string;
};

const CheckBox = forwardRef<HTMLInputElement, Props>(
  ({ connectorId, className = "", children, ...rest }, ref) => {
    return (
      <div className="w-full flex items-center gap-2">
        <div className="w-5 h-5 relative">
          <input
            id={connectorId}
            ref={ref}
            className={clsx("checkbox checkbox-sm checkbox-primary", className)}
            type="checkbox"
            {...rest}
          />
          <span className="absolute hidden peer-checked:flex pointer-events-none inset-0 justify-center items-center">
            <Icon iconName="Tick" className="text-green-600 w-4" />
          </span>
        </div>
        <label htmlFor={connectorId}>{children}</label>
      </div>
    );
  }
);

CheckBox.displayName = "My Custom CheckBox";
export default CheckBox;
