import type { NextPageWithLayout } from "@/pages/_app";
import { getAuthLayout } from "@/pages/components/partial/AuthLayout";
import { RegisterForm } from "@/pages/components/ui/organisms/RegisterForm";

const RegisterPage: NextPageWithLayout = () => {
  return <RegisterForm />
}

RegisterPage.getLayout = getAuthLayout;

export default RegisterPage