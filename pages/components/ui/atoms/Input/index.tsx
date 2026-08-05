import * as React from "react";
import { cn } from "@/pages/core/lib/cn";
import { Eye, EyeOff } from "lucide-react";

export type InputVariant = "outline" | "filled";
export type InputSize = "md" | "lg" | "xl";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    inputSize?: InputSize;
    error?: boolean;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    fullWidth?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses: Record<InputSize, string> = {
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-4 text-base",
    xl: "h-14 px-4 text-lg",
};

const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
};

const variantClasses: Record<InputVariant, string> = {
    outline: "bg-white border border-neutral-300 text-neutral-800 placeholder:text-neutral-400 hover:border-neutral-400 focus:border-primary-600",
    filled: "bg-neutral-50 border border-transparent text-neutral-800 placeholder:text-neutral-400 hover:bg-neutral-100 focus:border-primary-600 focus:bg-white",
};

export function Input({
    className,
    type = "text",
    variant = "outline",
    inputSize = "lg",
    error = false,
    disabled = false,
    leftIcon,
    rightIcon,
    label,
    helperText,
    errorMessage,
    fullWidth = true,
    rounded = "lg",
    id,
    ...rest
}: InputProps) {
    const inputId = id || React.useId();
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = React.useState(false);

    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium",
                        error ? "text-red-600" : "text-neutral-700"
                    )}
                >
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3 text-neutral-400 z-10 flex items-center pointer-events-none">
                        {leftIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={actualType}
                    disabled={disabled}
                    className={cn(
                        "w-full outline-none transition-colors duration-200",
                        variantClasses[variant],
                        sizeClasses[inputSize],
                        roundedClasses[rounded],
                        leftIcon && "pl-10",
                        (rightIcon || isPassword) && "pr-10",
                        error && "border-red-500 focus:border-red-500",
                        disabled && "opacity-50 cursor-not-allowed bg-neutral-100",
                        fullWidth && "w-full",
                        className
                    )}
                    {...rest}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute left-3 text-neutral-400 hover:text-neutral-600 z-10 flex items-center"
                        tabIndex={-1}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                )}

                {!isPassword && rightIcon && (
                    <div className="absolute right-3 text-neutral-400 z-10 flex items-center pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>

            {(helperText || errorMessage) && (
                <p className={cn("text-xs", error ? "text-red-600" : "text-neutral-500")}>
                    {error ? errorMessage : helperText}
                </p>
            )}
        </div>
    )
}