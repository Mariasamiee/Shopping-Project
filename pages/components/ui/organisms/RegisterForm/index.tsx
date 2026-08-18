import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FormField } from "@/pages/components/ui/molecules/FormField";
import { Button } from "@/pages/components/ui/atoms/Button";
import { Checkbox } from "@/pages/components/ui/atoms/Checkbox";
import { Link } from "@/pages/components/ui/atoms/Link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { registerSchema } from "@/pages/core/validations/authValidation";
import { useAppDispatch } from "@/pages/core/store/hooks";
import { registerUser } from "@/pages/core/store/slices/authSlice";

interface RegisterValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    acceptPrivacy: boolean;
}

const initialValues: RegisterValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    acceptPrivacy: false,
}

export function RegisterForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleSubmit = (
        values: RegisterValues,
        { setSubmitting }: { setSubmitting: (v: boolean) => void }
    ) => {
        dispatch(
            registerUser({
                id: crypto.randomUUID(),
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                password: values.password,
            })
        )
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/");
        setSubmitting(false);
    }

    return (
        <div className="flex flex-col gap-14">
            <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-primary-600 rounded-full" />
                <Typography variant="h2">ایجاد حساب کاربری</Typography>
            </div>

            <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                    <Form className="flex flex-col gap-4">
                        <div className="flex gap-6">
                            <FormField name="firstName" placeholder="نام" inputSize="lg" />
                            <FormField name="lastName" placeholder="نام خانوادگی" inputSize="lg" />
                        </div>
                        <FormField name="phoneNumber" placeholder="شماره موبایل" inputSize="lg" />
                        <FormField name="password" type="password" placeholder="رمز عبور" inputSize="lg" />
                        <FormField name="confirmPassword" type="password" placeholder="تایید رمز عبور" inputSize="lg" />

                        <div className="flex items-center justify-start gap-2">
                            <Checkbox size="sm" checked={values.acceptPrivacy} onChange={(e) => setFieldValue("acceptPrivacy", e.target.checked)}
                                label="پذیرفتن حریم خصوصی" />
                        </div>
                        {touched.acceptPrivacy && errors.acceptPrivacy && (
                            <Typography variant="caption" color="danger">
                                {errors.acceptPrivacy}
                            </Typography>
                        )}

                        <Button type="submit" fullWidth loading={isSubmitting} rounded="lg" size="lg">
                            ثبت نام
                        </Button>

                        <Typography variant="bodySm" color="default" align="center">
                            من قبلا ثبت نام کرده ام؟{" "}
                            <Link href="/login" variant="primary">
                                صفحه ورود
                            </Link>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </div>
    )
}