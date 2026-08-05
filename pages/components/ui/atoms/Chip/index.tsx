import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type ChipVariant = "box" | "text";
export type ChipSize = "sm" | "md";

export interface ChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ChipVariant;
    size?: ChipSize;
    selected?: boolean;
    disabled?: boolean;
}

const sizeClassesBox: Record<ChipSize, string> = {
    sm: "h-9 min-w-9 px-2 text-sm",
    md: "h-11 min-w-11 px-3 text-base"
};

const sizeClassesText: Record<ChipSize, string> = {
    sm: "text-xs px-1",
    md: "text-sm px-1.5"
};

export function Chip({
    variant = "box",
    size = "md",
    selected = false,
    disabled = false,
    className,
    children,
    type = "button",
    ...rest
}: ChipProps) {
    if (variant === "text") {
        return (
            <button
                type={type}
                disabled={disabled}
                className={cn(
                    "font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                    sizeClassesText[size],
                    selected
                        ? "text-primary-700 font-semibold"
                        : "text-neutral-500 hover:text-neutral-700",
                    className
                )}
                {...rest}
            >
                {children}
            </button>
        )
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center rounded-md border font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                sizeClassesBox[size],
                selected
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-400",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}