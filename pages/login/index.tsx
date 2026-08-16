import { AuthLayout } from "@/pages/components/partial/AuthLayout";
import { LoginForm } from "@/pages/components/ui/organisms/LoginForm";
export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}