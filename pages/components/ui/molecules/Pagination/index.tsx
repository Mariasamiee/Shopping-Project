import * as React from "react";
import { cn } from "@/pages/core/lib/cn";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
    const pages: (number | "...")[] = [];

    pages.push(1);

    if (current > 3) pages.push("...");

    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    if (total > 1) pages.push(total);

    return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center gap-2" dir="rtl">
            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={`dots-${index}`} className="flex items-center justify-center bg-white border border-black text-neutral-500 h-13 w-14 rounded-2xl text-sm font-medium transition-colors duration-200">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            "h-13 w-14 rounded-2xl text-sm font-medium transition-colors duration-200 cursor-pointer",
                            page === currentPage
                                ? "bg-primary-600 text-white"
                                : "bg-white border border-black text-neutral-500 hover:bg-primary-300 hover:border-none hover:text-white"
                        )}>
                        {page}
                    </button>
                )
            )}
        </div>
    )
}