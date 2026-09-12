import Link from "next/link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import { Button } from "@/pages/components/ui/atoms/Button";

const banners = [
    { id: 1, title: "کوهنوردی آسان با بهترین باتوم ها", subtitle: "", image: "/images/Rectangle-24.png", productImage: "/images/batons.png", href: "/products?category=trekking" },
    { id: 2, title: "به راحتی هرجایی آشپزی کنید!", subtitle: "با محصولات بولین", image: "/images/Rectangle-25.png", productImage: "/images/cooking-set.png", href: "/products?category=cooking" }
]

export function BannerSection() {
    return (
        <div className="w-[1020px] py-11 px-4 mx-auto" dir="rtl">
            <div className="grid grid-cols-2 gap-4">
                {banners.map((banner) => (
                    <div key={banner.id} className="relative rounded-[20px] overflow-hidden h-[190px] bg-cover bg-center flex items-center justify-between p-6"
                        style={{ backgroundImage: `url(${banner.image})` }}>
                        <img src={banner.productImage} alt={banner.title} className="absolute left-4 top-1/2 -translate-y-1/2 max-w-[60%] max-h-[160px] object-contain z-10" />

                        <div className="relative z-10 flex flex-col items-start text-right mr-0 ml-auto max-w-[65%]">
                            <Typography variant="h4" color="white" align="right" className="-translate-y-5 font-extrabold text-white leading-[1.4] -mb-0">
                                {banner.title}
                            </Typography>

                            {banner.subtitle && (
                                <Typography variant="h4" color="white" align="right" className="-translate-y-4 text-white/80 mb-3">
                                    {banner.subtitle}
                                </Typography>
                            )}

                            <Link href={banner.href} className={`-translate-y-5 ${!banner.subtitle ? "mt-3" : ""}`}>
                                <Button variant="solid" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-full px-3 py-0.5 duration-200 h-5 flex items-center justify-center">
                                    مشاهده
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}