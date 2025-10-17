import { TextShimmer } from "./components/TextShimmer";
import { Icon } from "@/components/UI";

export default function Loading() {
  return (
    <div
      dir="ltr"
      className="flex flex-col items-center justify-center h-screen w-screen"
    >
      <TextShimmer className="font-black text-3xl p-2" duration={1}>
        Loading...
      </TextShimmer>
      <Icon width={60} height={60} iconName="Loading" />
    </div>
  );
}
