import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type ProgressBarSize = "sm" | "md";
export type ProgressBarColor = "primary" | "success" | "danger" | "neutral";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    size?: ProgressBarSize;
    color?: ProgressBarColor;
    rounded?: boolean;
}

const sizeClasses: Record<ProgressBarSize, string> = {
    sm: "h-1.5",
    md: "h-2.5"
};

const colorClasses: Record<ProgressBarColor, string> = {
    primary: "bg-primary-600",
    success: "bg-green-600",
    danger: "bg-red-600",
    neutral: "bg-neutral-500"
};

export function ProgressBar({
    value,
    max = 100,
    size = "md",
    color = "primary",
    rounded = true,
    className,
    ...rest
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            className={cn(
                "w-full bg-neutral-200 overflow-hidden",
                sizeClasses[size],
                rounded && "rounded-full",
                className
            )}
            {...rest}
        >
            <div
                className={cn(
                    "h-full transition-all duration-300",
                    colorClasses[color],
                    rounded && "rounded-full"
                )}
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}