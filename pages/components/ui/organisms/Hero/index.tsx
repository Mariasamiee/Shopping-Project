import { SearchBox } from "@/pages/components/ui/molecules/SearchBox";

export interface HeroProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch?: () => void;
}

export function Hero({ searchValue, onSearchChange, onSearch }: HeroProps) {
    return (
        <div className="relative">
            <div className="overflow-hidden">
                <img src="/images/search.png" alt="آکو اسپرت" className="w-full object-cover" />
            </div>

            <div className="max-w-257.5 mx-auto px-4 -mt-20 relative z-10">
                <SearchBox value={searchValue} onChange={onSearchChange} onSearch={onSearch} variant="hero"/>
            </div>
        </div>
    )
}