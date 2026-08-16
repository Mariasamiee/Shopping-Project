import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FormField } from "@/pages/components/ui/molecules/FormField";
import { Button } from "@/pages/components/ui/atoms/Button";
import { Link } from "@/pages/components/ui/atoms/Link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { loginSchema } from "@/pages/core/validations/authValidation";
import { store } from "@/pages/core/store";
import { loginUser } from "@/pages/core/store/slices/authSlice";

interface LoginValues {
  phoneNumber: string;
  password: string;
}

const initialValues: LoginValues = {
  phoneNumber: "",
  password: "",
}

export function LoginForm() {
  const router = useRouter();
  const handleSubmit = (
    values: LoginValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void }
  ) => {
    store.dispatch(loginUser(values));
    const isAuthenticated = store.getState().auth.isAuthenticated;
    if (isAuthenticated) {
      toast.success("ورود موفق");
      router.push("/");
    } else {
      toast.error("شماره موبایل یا رمز عبور اشتباه است");
    }
    setSubmitting(false);
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-primary-600 rounded-full" />
        <Typography variant="h2">ورود به حساب کاربری</Typography>
      </div>

      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <FormField name="phoneNumber" placeholder="شماره موبایل" inputSize="lg" />
            <FormField name="password" type="password" placeholder="رمز عبور" inputSize="lg" />
            <Link href="/forgot-password" variant="primary" size="xs" >
              فراموشی رمزعبور
            </Link>

            <Button type="submit" fullWidth loading={isSubmitting} rounded="lg" size="lg">
              ورود
            </Button>

            <Typography variant="bodySm" color="default" align="center">
              من هنوز ثبت نام نکرده ام؟{" "}
              <Link href="/Register" variant="primary">
                صفحه ثبت نام
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  )
}