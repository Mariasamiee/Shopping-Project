import type { ReactElement } from "react";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 md:p-8" dir="rtl">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-16">

          <div className="w-full md:w-1/1 flex justify-center">
            <div className="w-full max-w-102.5">
              {children}
            </div>
          </div>

          <div className="w-full md:w-1/1 flex">
            <img src="/images/auth.png" alt=""
              className="w-full max-w-150 h-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function getAuthLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}