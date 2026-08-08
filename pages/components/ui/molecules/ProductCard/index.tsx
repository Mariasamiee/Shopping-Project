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
        <NextLink
            href={`/products/${product.slug}`}
            className="block border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-square bg-neutral-50">
                <img src={product.thumbnail} alt={product.name} className="h-full w-full object-cover" />

                {hasDiscount && (
                    <Badge color="primary" variant="solid" className="absolute top-2 right-2">
                        ٪{product.discountPercent}
                    </Badge>
                )}
            </div>

            <div className="p-3 flex flex-col gap-1">
                <Typography variant="bodySm" truncate>
                    {product.name}
                </Typography>

                <div className="flex items-center gap-2">
                    <Typography variant="priceSm">
                        {product.discountPrice.toLocaleString("fa-IR")} تومان
                    </Typography>

                    {hasDiscount && (
                        <Typography variant="caption" color="muted" className="line-through">
                            {product.price.toLocaleString("fa-IR")}
                        </Typography>
                    )}
                </div>
            </div>
        </NextLink>
    )
}