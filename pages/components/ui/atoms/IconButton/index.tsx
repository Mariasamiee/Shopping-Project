import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonColor = "primary" | "neutral" | "default";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: IconButtonVariant;
    color?: IconButtonColor;
    size?: IconButtonSize;
    rounded?: "md" | "full";
    label?: string;
}

const sizeClasses: Record<IconButtonSize, string> = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11"
};

const roundedClasses = {
    md: "rounded-md",
    full: "rounded-full"
};

const colorClasses: Record<IconButtonColor, Record<IconButtonVariant, string>> = {
    primary: {
        solid: "bg-primary-600 text-white hover:bg-primary-700",
        outline: "border border-primary-600 text-primary-700 hover:bg-primary-50",
        ghost: "text-primary-700 hover:bg-primary-50"
    },
    neutral: {
        solid: "bg-neutral-800 text-white hover:bg-neutral-700",
        outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50",
        ghost: "text-neutral-600 hover:bg-neutral-100"
    },
    default: {
        solid: "text-black",
        outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50",
        ghost: "text-neutral-600 hover:bg-neutral-100"
    }
};

export function IconButton({
    icon,
    label,
    variant = "outline",
    color = "neutral",
    size = "md",
    rounded = "md",
    disabled,
    className,
    type = "button",
    ...rest
}: IconButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            aria-label={label}
            className={cn(
                "inline-flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
                sizeClasses[size],
                roundedClasses[rounded],
                colorClasses[color][variant],
                className
            )}
            {...rest}
        >
            {icon}
        </button>
    )
}