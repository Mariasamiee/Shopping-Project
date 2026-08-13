import * as React from "react";
import { Percent, ChevronRight, ChevronLeft } from "lucide-react";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { Link } from "@/pages/components/ui/atoms/Link";
import { IconButton } from "@/pages/components/ui/atoms/IconButton";
import { ProductCard } from "@/pages/components/ui/molecules/ProductCard";
import type { Product } from "@/pages/core/types/product";
import Icon from "../../atoms/Icon";

export interface SpecialOfferSectionProps {
  products: Product[];
  viewAllHref: string;
}

const ITEMS_PER_PAGE = 4;

export function SpecialOfferSection({ products, viewAllHref }: SpecialOfferSectionProps) {
  const [startIndex, setStartIndex] = React.useState(0)
  if (products.length === 0) return null
  const canGoNext = startIndex + ITEMS_PER_PAGE < products.length
  const canGoPrev = startIndex > 0
  const visibleProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const handleNext = () => {
    if (canGoNext) setStartIndex(startIndex + ITEMS_PER_PAGE)
  }
  const handlePrev = () => {
    if (canGoPrev) setStartIndex(startIndex - ITEMS_PER_PAGE)
  }

  return (
    <section className="max-w-6xl mx-auto py-8">
      <div className="bg-primary-500 rounded-4xl py-4 px-1 flex items-center gap-2">
        <div className="shrink-0 w-35 px-4 ">
          <div className="mb-5">
            <Icon name="offer" size={70} />
          </div>

          <div className="mb-16">
            <Typography variant="h1" className="pb-5">تخفیفات ویژه</Typography>

            <Link href={viewAllHref} variant="default" underline="hover" size="base">
              مشاهده همه
            </Link>
          </div>
        </div>

        <IconButton
          icon={<Icon name="right" size={40} />}
          color="default"
          variant="solid"
          disabled={!canGoPrev}
          onClick={handlePrev}
        />

        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <IconButton
          icon={<Icon name="left" size={40} />}
          color="default"
          variant="solid"
          disabled={!canGoNext}
          onClick={handleNext}
        />
      </div>
    </section>
  )
}