import * as React from "react";
import NextLink from "next/link";
import { Typography } from "@/pages/components/ui/atoms/Typography";
import Icon from "@/pages/components/ui/atoms/Icon";

const services = [
    { icon: "fo-trust", label: "ارائه بهترین خدمات" },
    { icon: "fo-send", label: "ارسال سریع به سراسر ایران" },
    { icon: "fo-backup", label: "پشتیبانی 24 ساعته" },
    { icon: "fo-back", label: "7روز ضمانت بازگشت" },
    { icon: "fo-guaranty", label: "ضمانت اصالت کالا" }
]

const customerLinks = [
    { label: "درباره ما", href: "/about" },
    { label: "قوانین", href: "/rules" },
    { label: "سوالات متداول", href: "/faq" }
]

const usefulLinks = [
    { label: "درباره ما", href: "/about" },
    { label: "قوانین", href: "/rules" },
    { label: "سوالات متداول", href: "/faq" },
]

export function Footer() {
    return (
        <footer className="bg-[#282828] text-white" dir="rtl">
            <div className="max-w-6xl mx-auto px-6 pt-4 pb-8">
                <div className="flex items-center justify-center gap-14">
                    {services.map((service) => (
                        <div key={service.label} className="flex flex-col items-center gap-3 text-center">
                            <Icon name={service.icon} size={75} />
                            <Typography variant="bodySm" color="white">
                                {service.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-5xl mx-auto border-t border-neutral-500" />

            <div className="w-full pt-8 pb-16 pr-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-8">
                        <div className="mt-1">
                            <Icon name="acoIcon" size={92} />
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-2.5">
                                <Icon name="fo-tel1" size={28} />
                                <Typography variant="body" color="white">
                                    09125854944
                                </Typography>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Icon name="fo-tel2" size={28} />
                                <Typography variant="body" color="white">
                                    021-3266641
                                </Typography>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Icon name="fo-map" size={28} />
                                <Typography variant="body" color="white">
                                    همدان،خیابان جمهوری،پاساژ سعیدیه،پلاک 290
                                </Typography>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Icon name="fo-time" size={28} />
                                <Typography variant="body" color="white">
                                    از شنبه تا پنجشنبه از ساعت 10:00 تا 21:00
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-28 mr-auto margin-left: 240px">
                        <div className="flex flex-col gap-3">
                            <Typography variant="h3" color="white">
                                خدمات مشتریان
                            </Typography>

                            {customerLinks.map((link) => (
                                <NextLink key={link.href} href={link.href} 
                                className="text-white hover:text-primary-600 text-base transition-colors duration-200">
                                    {link.label}
                                </NextLink>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3.5">
                            <Typography variant="h3" color="white">
                                لینک های مفید
                            </Typography>

                            {usefulLinks.map((link) => (
                                <NextLink key={link.href} href={link.href}
                                    className="text-white hover:text-primary-600 text-base transition-colors duration-200">
                                    {link.label}
                                </NextLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center">
                <div className="shrink-0 bg-[#282828] pr-3 pl-4">
                    <Typography variant="h3" color="white">
                        درباره{" "}
                        <span className="text-primary-600">
                            آکو اسپورت
                        </span>
                    </Typography>
                </div>

                <div className="flex-1 border-t border-neutral-500" />

            </div>

            <div className="w-full px-7 pt-5 pb-6">
                <div className="flex items-center justify-between gap-16  min-height: 100px">
                    <div className="max-width: 780px">
                        <p className="text-right text-base leading-7 text-white">
                            فروشگاه آکو اسپرت افتخار عرضه حضوری و مجازی محصولات متنوع کوهنوردی طبیعت<br />
                            گردی و لوازم آن را با قیمت بسیار مناسب کیفیت مطلوب و فراهم سازی بستری مطمئن<br />
                            جهت خرید آسان و رضایت و اطمینان خاطر کامل مشتریان عزیز این مجموعه را در<br />
                            کارنامه خود دارد.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <img src="/images/fo3.png" alt="enamad" className="h-24 w-auto"/>
                        <img src="/images/fo2.png" alt="samandehi" className="h-24 w-auto"/>
                        <img src="/images/fo1.png" alt="zibal" className="h-24 w-auto"/>
                    </div>
                </div>
            </div>

            <div className="w-full border-t border-neutral-500" />

            <div className="py-6">
                <Typography variant="h4" color="white" align="center">
                    تمامی حقوق برای Ako Sport محفوظ است.
                </Typography>
            </div>
        </footer>
    )
}
