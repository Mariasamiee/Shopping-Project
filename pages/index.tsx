import { useGetProductsQuery } from "./core/store/api/productsApi";
import { ProductSection } from "./components/ui/organisms/ProductSection";
import { Header } from "./components/ui/organisms/Header";
import { Hero } from "./components/ui/organisms/Hero";
import { useState } from "react";
import { SpecialOfferSection } from "./components/ui/organisms/SpecialOfferSection";
import { Input } from "./components/ui/atoms/Input";

export default function Home() {
  // const { data: products } = useGetProductsQuery({
  //   sortBy: "createdAt",
  //   order: "desc",
  // });

  const [search, setSearch] = useState("");

    const { data: products } = useGetProductsQuery();
  const discounted = (products || []).filter((p) => p.discountPercent > 0);

  return (
    <div>
      <Hero
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={() => console.log("جستجو:", search)}
      />
      <ProductSection
        title="جدیدترین محصولات"
        products={(products || []).slice(0, 5)}
        viewAllHref="/products?sort=newest"
      />
    <SpecialOfferSection products={discounted} viewAllHref="/products?filter=discount" />
    </div>
  )
}