import toast from "react-hot-toast";
import axios from "axios";
import { getLocale } from "./languageHandler";

const messages = {
  en: {
    default: "Something went wrong. Please try again later",
    400: "Invalid request",
    401: "You need to log in to perform this action",
    403: "You do not have permission",
    404: "Item not found",
    409: "This item already exists",
    500: "Internal server error. Please try again later",
  },
  fa: {
    default: "مشکلی پیش آمده است، لطفا بعدا مجددا تلاش کنید",
    400: "درخواست نامعتبر بود",
    401: "برای انجام این عملیات باید وارد شوید",
    403: "اجازه دسترسی ندارید",
    404: "موردی پیدا نشد",
    409: "این مورد قبلا ثبت شده است",
    500: "خطای داخلی سرور. لطفا بعدا تلاش کنید",
  },
};

const errorToast = (error: unknown) => {
  const locale = getLocale();
  const localeMessages = messages[locale];
  let errorMessage = localeMessages.default;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status && status.toString() in localeMessages) {
      errorMessage =
        localeMessages[status.toString() as keyof typeof localeMessages];
    }
  }

  toast.error(errorMessage);
};

export default errorToast;
