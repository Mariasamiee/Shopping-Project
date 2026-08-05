import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "bodySm" | "caption" | "price" | "priceSm";
export type TypographyColor = "default" | "muted" | "primary" | "danger" | "success" | "white";
export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";
export type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

export interface TypographyProps
    extends React.HTMLAttributes<HTMLElement> {
    as?: TypographyTag;
    variant?: TypographyVariant;
    color?: TypographyColor;
    weight?: TypographyWeight;
    truncate?: boolean;
    align?: "right" | "left" | "center";
}

const variantClasses: Record<TypographyVariant, string> = {
    h1: "text-3xl leading-tight",
    h2: "text-2xl leading-tight",
    h3: "text-xl leading-snug",
    h4: "text-lg leading-snug",
    body: "text-base leading-relaxed",
    bodySm: "text-sm leading-relaxed",
    caption: "text-xs leading-normal",
    price: "text-2xl leading-tight",
    priceSm: "text-base leading-tight"
};

const defaultWeightByVariant: Record<TypographyVariant, TypographyWeight> = {
    h1: "bold",
    h2: "bold",
    h3: "semibold",
    h4: "semibold",
    body: "normal",
    bodySm: "normal",
    caption: "normal",
    price: "bold",
    priceSm: "semibold"
};

const weightClasses: Record<TypographyWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

const colorClasses: Record<TypographyColor, string> = {
    default: "text-neutral-900",
    muted: "text-neutral-500",
    primary: "text-primary-600",
    danger: "text-red-600",
    success: "text-green-600",
    white: "text-white",
};

const defaultTagByVariant: Record<TypographyVariant, TypographyTag> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    body: "p",
    bodySm: "p",
    caption: "span",
    price: "span",
    priceSm: "span",
};

export function Typography({
    as,
    variant = "body",
    color = "default",
    weight,
    truncate = false,
    align,
    className,
    children,
    ...rest
}: TypographyProps) {
    const Tag = as || defaultTagByVariant[variant];
    const finalWeight = weight || defaultWeightByVariant[variant];

    return (
        <Tag
            className={cn(
                variantClasses[variant],
                weightClasses[finalWeight],
                colorClasses[color],
                truncate && "truncate",
                align === "right" && "text-right",
                align === "left" && "text-left",
                align === "center" && "text-center",
                className
            )}
            {...rest}
        >
            {children}
        </Tag>
    )
}