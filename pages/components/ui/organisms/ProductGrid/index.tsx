import { Typography } from "@/pages/components/ui/atoms/Typography";

const columns = [
    {
        top: { id: 1, bg: "/images/grid/Rectangle-43.png", img: "/images/products/IMG_20230122_154255_664_prev_ui 1.png" },
        bottom: { id: 2, bg: "/images/grid/Rectangle-135.png", img: "/images/products/sanicamping-naturepanco-2_prev_ui 1.png" },
        pattern: "grid-rows-[1fr_1.6fr]"
    },
    {
        top: { id: 3, bg: "/images/grid/Rectangle-42.png", img: "/images/products/kettle.png" },
        bottom: { id: 4, bg: "/images/grid/Rectangle-134.png", img: "/images/products/chair.png" },
        pattern: "grid-rows-[1fr_1.6fr]"
    },
    {
        top: { id: 5, bg: "/images/grid/Rectangle-41.png", img: "/images/products/q97hC57_lMFZfqI2-removebg-preview 3.png" },
        bottom: { id: 6, bg: "/images/grid/Rectangle-45.png", img: "/images/products/stove.png" },
        pattern: "grid-rows-[1.6fr_1fr]"
    },
    {
        top: { id: 7, bg: "/images/grid/Rectangle-44.png", img: "/images/products/tent.png" },
        bottom: { id: 8, bg: "/images/grid/Rectangle-46.png", img: "/images/products/knife.png" },
        pattern: "grid-rows-[1.6fr_1fr]"
    }
]

export function ProductGridSection() {
    return (
        <div className="py-17.5" dir="ltr">
            <div className="max-w-6xl mx-auto px-6">
                <Typography variant="h1" align="center" weight="black" className="mb-8" dir="rtl">
                    با اینا سفرت به راهه!
                </Typography>

                <div className="grid grid-cols-4 gap-3 h-[650px]">
                    {columns.map((col, idx) => (
                        <div key={idx} className={`grid gap-4 h-full ${col.pattern}`}>
                            <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] w-full h-full"
                                style={{
                                    backgroundImage: `url(${col.top.bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}>
                                <img src={col.top.img} alt="" className="absolute inset-0 w-full h-full object-contain p-2 drop-shadow-md" />
                            </div>

                            <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] w-full h-full"
                                style={{
                                    backgroundImage: `url(${col.bottom.bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}>
                                <img src={col.bottom.img} alt="" className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}