import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/pages/core/lib/cn";

export type ColorSwatchSize = "sm" | "md" | "lg";

export interface ColorSwatchProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    color: string;
    size?: ColorSwatchSize;
    selected?: boolean;
    disabled?: boolean;
    label: string;
}

const sizeClasses: Record<ColorSwatchSize, string> = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
};

const checkSizeClasses: Record<ColorSwatchSize, number> = {
    sm: 12,
    md: 14,
    lg: 16
};

export function ColorSwatch({
    color,
    size = "md",
    selected = false,
    disabled = false,
    label,
    className,
    type = "button",
    ...rest
}: ColorSwatchProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            aria-label={label}
            aria-pressed={selected}
            style={{ backgroundColor: color }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-full border-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                sizeClasses[size],
                selected ? "border-primary-600 ring-2 ring-primary-200" : "border-neutral-200 hover:border-neutral-300",
                className
            )}
            {...rest}
        >
            {selected && (
                <Check
                    size={checkSizeClasses[size]}
                    className="text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.6)]"
                />
            )}
        </button>
    )
}