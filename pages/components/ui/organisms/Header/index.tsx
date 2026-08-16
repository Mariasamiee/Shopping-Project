import NextLink from "next/link";
import { Button } from "@/pages/components/ui/atoms/Button";
import { Link } from "@/pages/components/ui/atoms/Link";
import { Badge } from "@/pages/components/ui/atoms/Badge";
import { useAppSelector, useAppDispatch } from "@/pages/core/store/hooks";
import { selectCartTotalQuantity } from "@/pages/core/store/slices/cartSlice";
import Icon from "../../atoms/Icon";
import { useRouter } from "next/router";
import { logout } from "@/pages/core/store/slices/authSlice";
import { toast } from "react-toastify";

const navLinks = [
    { label: "صفحه اصلی", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "فروش ویژه", href: "/sale" },
    { label: "درباره ما", href: "/about" }
];

export function Header() {
    const cartCount = useAppSelector(selectCartTotalQuantity);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout())
        toast.success("با موفقیت خارج شدید")
        router.push("/")
    };

    return (
        <header className="shadow-lg bg-white">
            <div className="max-w-337.5 mx-auto h-30 flex items-center justify-between">
                <NextLink href="/" className="shrink-0">
                    <Icon name="acoIcon" size={70} />
                </NextLink>

                <nav className="flex md:flex gap-7 ml-110">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} variant="muted" size="he" underline="none">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <Button variant="outline" color="primary" size="lg" leftIcon={<Icon name="login" size={25} />} onClick={handleLogout}>
                            خروج
                        </Button>
                    ) : (
                        <NextLink href="/login">
                            <Button variant="outline" color="primary" size="lg" leftIcon={<Icon name="login" size={25} />}>
                                ورود / ثبت نام
                            </Button>
                        </NextLink>
                    )}

                    <NextLink href="/cart" className="relative">
                        <Icon name="he-cart" size={35} className="text-neutral-700" />
                        {cartCount > 0 && (
                            <Badge color="primary" variant="solid" size="sm" rounded="full" className="absolute -top-2 -left-2 h-5 w-5 p-0">
                                {cartCount}
                            </Badge>
                        )}
                    </NextLink>
                </div>
            </div>
        </header>
    )
}