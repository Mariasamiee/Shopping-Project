import * as React from "react";
import { useGetProductsQuery } from "@/pages/core/store/api/productsApi";
import { SearchBox } from "@/pages/components/ui/molecules/SearchBox";
import { Chip } from "@/pages/components/ui/atoms/Chip";
import { ProductCard } from "@/pages/components/ui/molecules/ProductCard";
import { Pagination } from "@/pages/components/ui/molecules/Pagination";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import Icon from "../../atoms/Icon";

type SortOption = "newest" | "expensive" | "cheap" | "bestseller" | "mostViewed";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "جدیدترین" },
    { value: "mostViewed", label: "پربازدیدترین" },
    { value: "cheap", label: "ارزان‌ترین" },
    { value: "expensive", label: "گران‌ترین" },
    { value: "bestseller", label: "پرفروش‌ترین" }
];

const ITEMS_PER_PAGE = 20;

export function ProductCatalog() {
    const { data: products, isLoading } = useGetProductsQuery();
    const [search, setSearch] = React.useState("");
    const [sort, setSort] = React.useState<SortOption | null>(null);
    const [page, setPage] = React.useState(1);

    const filteredProducts = React.useMemo(() => {
        if (!products) return [];

        let result = products;

        if (search.trim()) {
            result = result.filter((p) => p.name.includes(search.trim()));
        }

        if (sort) {
            result = [...result].sort((a, b) => {
                if (sort === "cheap") return a.discountPrice - b.discountPrice;
                if (sort === "expensive") return b.discountPrice - a.discountPrice;
                if (sort === "bestseller") return b.reviewsCount - a.reviewsCount;
                if (sort === "mostViewed") return b.rating - a.rating;
                return Number(b.id) - Number(a.id);
            });
        }

        return result;
    }, [products, search, sort]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleSortChange = (value: SortOption) => {
        setSort(value)
        setPage(1)
    };

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    };

    if (isLoading) {
        return <Typography color="muted">در حال بارگذاری...</Typography>
    }

    return (
        <div>
            <SearchBox value={search} onChange={handleSearchChange} variant="compact" className="max-w-6xl mb-10 mt-2" />

            <div className="flex items-center gap-4 mb-6 pb-3 border-b-2 border-neutral-400">
                <Icon name="sort" />
                <Typography variant="bodySm" color="default">
                    مرتب سازی:
                </Typography>
                {sortOptions.map((option) => (
                    <Chip key={option.value} variant="text" selected={sort === option.value} onClick={() => handleSortChange(option.value)}>
                        {option.label}
                    </Chip>
                ))}
            </div>

            {paginatedProducts.length === 0 ? (
                <Typography variant="body" color="muted">
                    محصولی یافت نشد.
                </Typography>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-12 mb-8">
                    {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    )
}