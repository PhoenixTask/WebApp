import toast from "react-hot-toast";
import { getLocale } from "@/functions/languageHandler";

const messages = {
  en: {
    syncing: "Syncing data...",
  },
  fa: {
    syncing: "...در حال همگام‌سازی",
  },
};

let currentToastId: string | null = null;

const loadingToast = (key?: keyof (typeof messages)["en"]) => {
  const locale = getLocale();
  const localeMessages = messages[locale];
  const message = localeMessages[key || "syncing"];

  // close previous toast
  if (currentToastId) {
    toast.dismiss(currentToastId);
  }

  currentToastId = toast.loading(message, {
    duration: Infinity,
  });

  return currentToastId;
};

// finish loading toast
loadingToast.finish = () => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }
};

export default loadingToast;
