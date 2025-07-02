import clsx from "clsx";
import { colorVariant } from "@/functions/colorInterpretation";

const COLOR_OPTIONS = [
  { name: "sky", className: colorVariant("sky").bg },
  { name: "ocean", className: colorVariant("ocean").bg },
  { name: "mint", className: colorVariant("mint").bg },
  { name: "forest", className: colorVariant("forest").bg },
  { name: "sun", className: colorVariant("sun").bg },
  { name: "sand", className: colorVariant("sand").bg },
  { name: "rose", className: colorVariant("rose").bg },
  { name: "cherry", className: colorVariant("cherry").bg },
  { name: "grape", className: colorVariant("grape").bg },
  { name: "lavender", className: colorVariant("lavender").bg },
  { name: "coal", className: colorVariant("coal").bg },
  { name: "stone", className: colorVariant("stone").bg },
];

type ColorPickerProps = {
  colorName?: string;
  setColorName: (color: string) => void;
};

export default function ColorPicker({
  colorName,
  setColorName,
}: ColorPickerProps) {
  return (
    <div className="flex justify-center gap-2">
      {COLOR_OPTIONS.map((color) => (
        <div
          key={color.name}
          onClick={() => setColorName(color.name)}
          className={clsx(
            "w-5 h-5 cursor-pointer transition-all duration-300 ease-in-out",
            color.className,
            "hover:scale-110",
            colorName === color.name
              ? "ring-2 ring-accent ring-offset-1 rounded-sm"
              : "rounded-full"
          )}
        />
      ))}
    </div>
  );
}
