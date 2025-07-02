import toast from "react-hot-toast";
import axios from "axios";

const errorToast = (error: unknown) => {
  let errorMessage = "مشکلی پیش آمده است، لطفا بعدا مجددا تلاش کنید.";

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 400:
        errorMessage = "درخواست نامعتبر بود.";
        break;
      case 401:
        errorMessage = "برای انجام این عملیات باید وارد شوید.";
        break;
      case 403:
        errorMessage = "اجازه دسترسی ندارید.";
        break;
      case 404:
        errorMessage = "موردی پیدا نشد.";
        break;
      case 409:
        errorMessage = "این مورد قبلا ثبت شده است.";
        break;
      case 500:
        errorMessage = "خطای داخلی سرور. لطفا بعدا تلاش کنید.";
        break;
    }
  }

  toast.error(errorMessage);
};

export default errorToast;
