import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeColor = "primary" | "danger" | "success" | "neutral";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    color?: BadgeColor;
    size?: BadgeSize;
    rounded?: "md" | "full";
}

const sizeClasses: Record<BadgeSize, string> = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2.5 py-1"
};

const roundedClasses = {
    md: "rounded-md",
    full: "rounded-full"
};

const colorClasses: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
        solid: "bg-primary-600 text-white",
        soft: "bg-primary-100 text-primary-700",
        outline: "border border-primary-600 text-primary-700 bg-transparent"
    },
    danger: {
        solid: "bg-red-600 text-white",
        soft: "bg-red-100 text-red-700",
        outline: "border border-red-600 text-red-700 bg-transparent"
    },
    success: {
        solid: "bg-green-600 text-white",
        soft: "bg-green-100 text-green-700",
        outline: "border border-green-600 text-green-700 bg-transparent"
    },
    neutral: {
        solid: "bg-neutral-800 text-white",
        soft: "bg-neutral-100 text-neutral-700",
        outline: "border border-neutral-300 text-neutral-700 bg-transparent"
    }
};

export function Badge({
    className,
    variant = "solid",
    color = "primary",
    size = "sm",
    rounded = "md",
    children,
    ...rest
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center font-medium leading-none",
                sizeClasses[size],
                roundedClasses[rounded],
                colorClasses[color][variant],
                className
            )}
            {...rest}
        >
            {children}
        </span>
    )
}