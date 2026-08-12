import { useGetProductsQuery } from "./core/store/api/productsApi";
import { ProductSection } from "./components/ui/organisms/ProductSection";
import { Header } from "./components/ui/organisms/Header";
import { Hero } from "./components/ui/organisms/Hero";
import { useState } from "react";

export default function Home() {
  const { data: products } = useGetProductsQuery({
    sortBy: "createdAt",
    order: "desc",
  });

  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />
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
    </div>

  )
}