import { AuthLayout } from "@/pages/components/partial/AuthLayout";
import { RegisterForm } from "@/pages/components/ui/organisms/RegisterForm";
export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}