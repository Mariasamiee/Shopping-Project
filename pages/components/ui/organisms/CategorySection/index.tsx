import { Typography } from "@/pages/components/ui/atoms/Typography";
const categories = [
    { id: 1, label: "اسکیت", img: "/images/products/16728225707628_prev_ui 1.png", bgImg: "/images/categories/Ellipse-1.png" },
    { id: 2, label: "چادر مسافرتی", img: "/images/categories/chaImg.png", bgImg: "/images/categories/Ellipse-2.png" },
    { id: 3, label: "تراول ماگ", img: "/images/products/تراول-ماگ-استارباکس-بنددار_prev_ui 1.png", bgImg: "/images/categories/Ellipse-3.png" },
    { id: 4, label: "کفش کوهنوردی", img: "/images/products/q97hC57_lMFZfqI2-removebg-preview 3.png", bgImg: "/images/categories/Ellipse-4.png" },
    { id: 5, label: "دمبل ورزشی", img: "/images/products/unsplash_IZOAOjvwhaM-removebg-preview 1.png", bgImg: "/images/categories/Ellipse-5.png" },
    { id: 6, label: "کوله کوهنوردی", img: "/images/categories/bagImg.png", bgImg: "/images/categories/Ellipse-6.png" },
]

export function CategorySection() {
    return (
        <div className="py-14" dir="rtl">
            <div className="max-w-6xl mx-auto px-6">
                <Typography variant="h2" align="center" className="mb-12">
                    محصولات محبوب
                </Typography>
                <div className="flex items-center justify-center gap-7">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col items-center gap-4 cursor-pointer group">
                            <div className="w-36 h-36 rounded-full overflow-hidden relative transition-transform duration-200 group-hover:scale-105"
                                style={{ backgroundImage: `url(${cat.bgImg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",}}>
                                <img src={cat.img} alt={cat.label} className="w-full h-full object-contain p-3"/>
                            </div>
                            <Typography variant="h4" align="center">
                                {cat.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}