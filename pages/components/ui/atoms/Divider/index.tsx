import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    color?: "light" | "default" | "dark";
}

const colorClasses = {
    light: "border-neutral-100",
    default: "border-neutral-200",
    dark: "border-neutral-300"
};

const variantClasses: Record<DividerVariant, string> = {
    solid: "border-solid",
    dashed: "border-dashed"
};

export function Divider({
    orientation = "horizontal",
    variant = "solid",
    color = "default",
    className,
    ...rest
}: DividerProps) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn(
                orientation === "horizontal" ? "w-full border-t" : "h-full border-r",
                variantClasses[variant],
                colorClasses[color],
                className
            )}
            {...rest}
        />
    )
}