import * as React from "react";

export interface AuthLayoutProps {
  breadcrumb: string;
  children: React.ReactNode;
}

export function AuthLayout({ breadcrumb, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-8 px-4" dir="rtl">
      <div className="w-full max-w-5xl">
        <p className="text-neutral-400 text-sm mb-3">{breadcrumb}</p>

        <div className="bg-white rounded-xl shadow-sm p-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center">
            <img
              src="/images/auth-illustration.png"
              alt="sport"
              className="max-w-xs w-full"
            />
          </div>

          <div className="flex-1 w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}