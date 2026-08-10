import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type BadgeVariant = "solid";
export type BadgeColor = "primary";
export type BadgeSize = "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    color?: BadgeColor;
    size?: BadgeSize;
}

const sizeClasses: Record<BadgeSize, string> = {
    md: "text-sm px-2.5 py-1 font-bold "
};

const roundedClasses = {
    md: "rounded-md",
    full: "rounded-full"
};

const colorClasses: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
        solid: "bg-primary-600"
    }
};

export function Badge({
    className,
    variant = "solid",
    color = "primary",
    size = "md",
    children,
    ...rest
}: BadgeProps) {
    return (
        <span
            className={cn(
                "absolute top-3 -left-7 w-28 -rotate-45 text-center",
                sizeClasses[size],
                colorClasses[color][variant],
                className
            )}
            {...rest}
        >
            {children}
        </span>
    )
}