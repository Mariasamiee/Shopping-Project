import * as Yup from "yup";
const phoneRegex = /^09\d{9}$/;
export const registerSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  phoneNumber: Yup.string()
    .matches(phoneRegex, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند")
    .required("تکرار رمز عبور الزامی است"),
  acceptPrivacy: Yup.boolean().oneOf([true], "پذیرفتن حریم خصوصی الزامی است"),
})

export const loginSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(phoneRegex, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
})