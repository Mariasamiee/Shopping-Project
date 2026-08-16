import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/pages/core/lib/cn";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: CheckboxSize;
    label?: React.ReactNode;
    error?: boolean;
}

const sizeClasses: Record<CheckboxSize, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5"
};

const checkIconSize: Record<CheckboxSize, number> = {
    sm: 12,
    md: 14
};

export function Checkbox({
    size = "md",
    label,
    error = false,
    disabled,
    checked,
    className,
    id,
    ...rest
}: CheckboxProps) {
    const inputId = id || React.useId();

    return (
        <label
            htmlFor={inputId}
            className={cn(
                "inline-flex items-center gap-2 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <span className="relative inline-flex items-center justify-center shrink-0">
                <input
                    id={inputId}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    className="peer sr-only"
                    {...rest}
                />
                <span
                    className={cn(
                        "flex items-center justify-center rounded-sm border transition-colors duration-200",
                        sizeClasses[size],
                        error
                            ? "border-red-500"
                            : "border-neutral-500 peer-checked:border-primary-600",
                        "peer-checked:bg-primary-600",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200",
                        className
                    )}
                >
                    {checked && <Check size={checkIconSize[size]} className="text-white" />}
                </span>
            </span>

            {label && (
                <span className={cn("text-[12px]", error ? "text-red-600" : "text-[#1E44C9]")}>
                    {label}
                </span>
            )}
        </label>
    )
}