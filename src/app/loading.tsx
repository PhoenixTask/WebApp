import { TextShimmer } from "./components/TextShimmer";

export default function Loading() {
  return (
    <div
      dir="ltr"
      className="flex flex-col items-center justify-center h-screen w-screen"
    >
      <TextShimmer className="font-black text-3xl p-2" duration={1}>
        Loading...
      </TextShimmer>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-base-content" />
    </div>
  );
}
