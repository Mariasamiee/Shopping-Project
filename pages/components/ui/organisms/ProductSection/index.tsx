import NextLink from "next/link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { ProductCard } from "@/pages/components/ui/molecules/ProductCard";
import type { Product } from "@/pages/core/types/product";

export interface ProductSectionProps {
    title: string;
    products: Product[];
    viewAllHref?: string;
}

export function ProductSection({ title, products, viewAllHref }: ProductSectionProps) {
    if (products.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto py-8">
            <div className="flex items-center justify-between mb-10">
                <Typography variant="h1">{title}</Typography>

                {viewAllHref && (
                    <NextLink href={viewAllHref} className="flex items-center gap-1 text-xl hover:text-neutral-700">
                        بیشتر
                    </NextLink>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}