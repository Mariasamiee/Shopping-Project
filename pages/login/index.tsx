import type { NextPageWithLayout } from "@/pages/_app";
import { getAuthLayout } from "@/pages/components/partial/AuthLayout";
import { LoginForm } from "@/pages/components/ui/organisms/LoginForm";

const LoginPage: NextPageWithLayout = () => {
  return <LoginForm />
}

LoginPage.getLayout = getAuthLayout;

export default LoginPage