import toast from "react-hot-toast";
import { getLocale } from "./languageHandler";

const messages = {
  en: {
    loginSuccess: "Logged in successfully",
    registerSuccess: "Registered successfully",
    columnCreated: "Column created successfully",
    columnDeleted: "Column deleted successfully",
    columnUpdated: "Column updated successfully",
    projectCreated: "Project created successfully",
    projectDeleted: "Project deleted successfully",
    projectUpdated: "Project updated successfully",
    taskCreated: "Task created successfully",
    taskDeleted: "Task deleted successfully",
    taskUpdated: "Task updated successfully",
    workspaceCreated: "Workspace created successfully",
    workspaceDeleted: "Workspace deleted successfully",
    workspaceUpdated: "Workspace updated successfully",
    accountUpdated: "User account updated successfully",
    profileImageUploaded: "Profile image uploaded successfully",
  },
  fa: {
    loginSuccess: "ورود با موفقیت انجام شد",
    registerSuccess: "ثبت نام با موفقیت انجام شد",
    columnCreated: "ستون با موفقیت ایجاد شد",
    columnDeleted: "ستون با موفقیت حذف شد",
    columnUpdated: "ستون با موفقیت ویرایش شد",
    projectCreated: "پروژه با موفقیت ایجاد شد",
    projectDeleted: "پروژه با موفقیت حذف شد",
    projectUpdated: "پروژه با موفقیت ویرایش شد",
    taskCreated: "تسک با موفقیت ایجاد شد",
    taskDeleted: "تسک با موفقیت حذف شد",
    taskUpdated: "تسک با موفقیت ویرایش شد",
    workspaceCreated: "میزکار با موفقیت ایجاد شد",
    workspaceDeleted: "میزکار با موفقیت حذف شد",
    workspaceUpdated: "میزکار با موفقیت ویرایش شد",
    accountUpdated: "ویرایش حساب کاربری با موفقیت انجام شد",
    profileImageUploaded: "تصویر پروفایل با موفقیت آپلود شد",
  },
};

const successToast = (key: keyof (typeof messages)["en"]) => {
  const locale = getLocale();
  const localeMessages = messages[locale];
  const message = localeMessages[key];
  toast.success(message);
};

export default successToast;
