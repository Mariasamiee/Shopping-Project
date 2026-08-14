import NextLink from "next/link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import type { Product } from "@/pages/core/types/product";
import Icon from "../../atoms/Icon";
import { QuantitySelector } from "../QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/pages/core/store/hooks";
import { addItem, increaseQuantity, decreaseQuantity } from "@/pages/core/store/slices/cartSlice";

export interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.discountPercent > 0;
    const dispatch = useAppDispatch();

    const quantity = useAppSelector((state) => {
        const item = state.cart.items.find((i) => i.id === product.id);
        return item?.quantity || 0;
    })

    const handleAddToCart = () => {
        dispatch(
            addItem({
                id: product.id,
                name: product.name,
                image: product.thumbnail,
                price: product.price,
                discountPrice: product.discountPrice,
                quantity: 1
            })
        )
    }

    const handleQuantityChange = (newValue: number) => {
        if (newValue > quantity) {
            dispatch(increaseQuantity(product.id));
        } else {
            dispatch(decreaseQuantity(product.id));
        }
    }

    return (
        <NextLink href={`/products/${product.slug}`} className="flex flex-col bg-white h-full rounded-xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.20)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.20)] transition-shadow duration-200" dir="rtl">
            <div className="relative aspect-square">
                <img src={product.thumbnail} alt={product.name} className="h-full w-full object-contain p-4" />

                {hasDiscount && (
                    <div className="absolute top-3 -left-8 w-28 -rotate-45 bg-primary-600 text-black  text-xs font-bold text-center py-1 shadow-sm">
                        {product.discountPercent}%
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 px-3 pb-3">
                <Typography variant="bodySm" color="default" className="line-clamp-2">
                    {product.name}
                </Typography>

                <div className="mt-auto pt-4 flex justify-between items-center gap-0.5">
                    <div onClick={(e) => e.preventDefault()}>
                        {quantity > 0 ? (
                            <QuantitySelector
                                value={quantity}
                                onChange={handleQuantityChange}
                                min={0}
                                size="sm"
                            />
                        ) : (
                            <button type="button" onClick={handleAddToCart}>
                                <Icon name="card-basket" />
                            </button>
                        )}
                    </div>

                    <div className="text-center">
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
            </div>
        </NextLink>
    )
}