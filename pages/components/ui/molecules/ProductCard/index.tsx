import * as React from "react";
import NextLink from "next/link";
import { Badge } from "@/pages/components/ui/atoms/Badge";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import type { Product } from "@/pages/core/types/product";

export interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.discountPercent > 0;

    return (
        <NextLink href={`/products/${product.slug}`} className="flex flex-col h-full rounded-xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.20)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.20)] transition-shadow duration-200" dir="rtl">
            <div className="relative aspect-square">
                <img src={product.thumbnail} alt={product.name} className="h-full w-full object-contain p-4" />

                {hasDiscount && (
                    <Badge>
                        {product.discountPercent}%
                    </Badge>
                )}
            </div>

            <div className="flex flex-col flex-1 px-3 pb-3">
                <Typography variant="bodySm" color="default" className="line-clamp-2">
                    {product.name}
                </Typography>

                <div className="mt-auto pt-4 text-center">
                    <Typography variant="priceSm" color={hasDiscount ? "primary" : "default"}>
                        {product.discountPrice.toLocaleString("fa-IR")}تومان
                    </Typography>

                    {hasDiscount && (
                        <Typography variant="caption" color="muted" className="line-through block">
                            {product.price.toLocaleString("fa-IR")}تومان
                        </Typography>
                    )}
                </div>
            </div>
        </NextLink>
    )
}