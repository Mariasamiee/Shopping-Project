import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/pages/core/lib/cn";

export type LinkVariant = "primary" | "muted" | "default" | "white";
export type LinkUnderline = "none" | "hover" | "always";

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string;
    variant?: LinkVariant;
    underline?: LinkUnderline;
    size?: "xs" | "sm" | "base";
}

const variantClasses: Record<LinkVariant, string> = {
    primary: "text-primary-700 hover:text-primary-800",
    muted: "text-neutral-500 hover:text-neutral-700",
    default: "text-neutral-800 hover:text-neutral-900",
    white: "text-white/90 hover:text-white"
};

const underlineClasses: Record<LinkUnderline, string> = {
    none: "no-underline",
    hover: "no-underline hover:underline",
    always: "underline"
};

const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base"
};

export function Link({
    href,
    variant = "primary",
    underline = "hover",
    size = "sm",
    className,
    children,
    ...rest
}: LinkProps) {
    return (
        <NextLink
            href={href}
            className={cn(
                "font-medium transition-colors duration-200",
                variantClasses[variant],
                underlineClasses[underline],
                sizeClasses[size],
                className
            )}
            {...rest}
        >
            {children}
        </NextLink>
    )
}