import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type BadgeVariant = "solid";
export type BadgeColor = "primary";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    color?: BadgeColor;
    size?: BadgeSize;
    rounded?: "md" | "full";
}

const sizeClasses: Record<BadgeSize, string> = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2.5 py-1",
};

const roundedClasses = {
    md: "rounded-md",
    full: "rounded-full",
};

const colorClasses: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
        solid: "bg-primary-600 text-black",
    },
};

export function Badge({
    className,
    variant = "solid",
    color = "primary",
    size = "md",
    rounded = "md",
    children,
    ...rest
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center font-bold leading-none",
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