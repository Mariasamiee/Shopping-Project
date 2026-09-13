import Link from "next/link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { Button } from "@/pages/components/ui/atoms/Button";

const banners = [
    { id: 3, title: "یه مبارزه جذاب با بهترین دستکش ها", image: "/images/Rectangle-40.png", href: "/products?category=gloves" },
    { id: 2, title: "ست بدنسازیت رو از اینجا بگیر!", image: "/images/Rectangle-38.png", href: "/products?category=gym" },
    { id: 1, title: "بهترین شلوار های کوهنوردی", image: "/images/Rectangle-39.png", href: "/products?category=pants" },
];

export function TripleBannerSection() {
    return (
        <div className="w-[1020px] py-12 px-4 mx-auto" dir="rtl">
            <div className="grid grid-cols-3 gap-4">
                {banners.map((banner) => (
                    <div key={banner.id} className="relative rounded-[20px] overflow-hidden h-[210px] group cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110" style={{ backgroundImage: `url(${banner.image})` }} />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500 rounded-[20px]" />
                        <div className="absolute inset-0 flex flex-col items-start justify-center -translate-y-5 pr-3 pl-4 gap-3 z-10 transition-transform duration-300 group-hover:-translate-y-6">
                            <Typography variant="body" color="white" weight="black" align="right" className="text-[15px] leading-tight whitespace-nowrap">
                                {banner.title}
                            </Typography>
                            <Link href={banner.href}>
                                <Button variant="solid" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-full px-4 h-6 text-[10px] font-bold transition-all duration-300 flex items-center justify-center border-none">
                                    مشاهده
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}