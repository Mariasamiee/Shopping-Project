import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/pages/core/lib/cn";
import Icon from "../../atoms/Icon";

export type SearchBoxVariant = "hero" | "compact";

export interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: () => void;
    placeholder?: string;
    variant?: SearchBoxVariant;
    className?: string;
}

const variantClasses: Record<SearchBoxVariant, string> = {
    hero: "h-32 rounded-md text-[26px] px-25 shadow-2xl",
    compact: "h-15 rounded-md text-lg px-25 bg-neutral-200"
};

export function SearchBox({ value, onChange, onSearch, placeholder = "محصول مورد نظر خود را جستجو کنید...", variant = "hero", className }: SearchBoxProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
            onSearch();
        }
    }

    return (
        <div className={cn("relative w-full", className)} dir="rtl">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={cn(
                    "w-full bg-white outline-none placeholder:text-neutral-500 focus:border-neutral-300 transition-colors duration-200 pl-10",
                    variantClasses[variant]
                )} />

            <button type="button" onClick={onSearch} className="absolute right-10 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                <Icon name="Search" size={variant === "hero" ? 30 : 25} />
            </button>
        </div>
    )
}