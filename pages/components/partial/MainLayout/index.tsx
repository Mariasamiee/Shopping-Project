import * as React from "react";
import { Header } from "@/pages/components/ui/organisms/Header";
// import { Footer } from "@/pages/components/ui/organisms/Footer";

export interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
        </div>
    )
}