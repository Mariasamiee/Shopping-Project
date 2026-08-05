import * as React from "react";
import { cn } from "@/pages/core/lib/cn";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "solid" | "outline" | "link";
export type ButtonColor = "primary";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full" | "xxl";
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg",
};

const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    xxl: "rounded-2xl",
    full: "rounded-full",
};

const colorClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
    primary: {
        solid: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500",
        outline: "bg-white border border-primary-600 text-black hover:bg-primary-50 focus:ring-primary-500",
        link: "text-primary-700 underline hover:text-primary-500"
    }
};

export function Button({
    className,
    variant = "solid",
    color = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    rounded = "lg",
    disabled,
    children,
    type = "button",
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={cn(
                "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
                sizeClasses[size],
                roundedClasses[rounded],
                colorClasses[color][variant],
                fullWidth && "w-full",
                className
            )}
            {...rest}
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {!loading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {!loading && children && <span>{children}</span>}
            {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    )
}