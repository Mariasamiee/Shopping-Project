// cleanup-and-retry.js
// اجرا: node cleanup-and-retry.js
//
// این اسکریپت دو کار می‌کند:
// 1) حذف 20 رکورد الکی (id از 1 تا 20) که خود mockapi موقع ساخت resource تولید کرده بود
// 2) ارسال دوباره 5 محصولی که قبلاً با خطای "fetch failed" رد شده بودند

const BASE_URL = "https://6a72d3694d741b02b1f7cbff.mockapi.io/products";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------- بخش 1: حذف رکوردهای الکی id 1 تا 20 ----------

async function cleanupFakeRecords() {
  console.log("در حال حذف رکوردهای الکی (id 1 تا 20)...");
  for (let id = 1; id <= 20; id++) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log(`🗑️  حذف شد: id ${id}`);
    } catch (err) {
      console.error(`❌ خطا در حذف id ${id}:`, err.message);
    }
    await sleep(300); // کمی تاخیر بین درخواست‌ها
  }
  console.log("پاک‌سازی تمام شد.\n");
}

// ---------- بخش 2: ارسال دوباره 5 محصول ناموفق ----------

const failedProducts = [
  {
    name: "کفش کوهنوردی زنانه کینگتکس مدل DENA",
    slug: "dena-1",
    category: "کفش کوهنوردی و ورزشی",
    brand: "Kingtex",
    price: 2350000,
    discountPercent: 0,
    discountPrice: 2350000,
    thumbnail: "https://picsum.photos/seed/dena-1/400/400",
    images: JSON.stringify([
      "https://picsum.photos/seed/dena-1a/400/400",
      "https://picsum.photos/seed/dena-1b/400/400",
      "https://picsum.photos/seed/dena-1c/400/400",
      "https://picsum.photos/seed/dena-1d/400/400",
    ]),
    rating: 4.6,
    reviewsCount: 12,
    description:
      "کفش کوهنوردی زنانه کینگتکس مدل DENA با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند Kingtex.",
    stock: 40,
    isAvailable: true,
    soldCount: 220,
    viewsCount: 1500,
    colors: JSON.stringify([
      { name: "آبی", hex: "#1E3A8A" },
      { name: "مشکی", hex: "#111111" },
    ]),
    sizes: JSON.stringify([38, 39, 40, 41]),
    specifications: JSON.stringify([
      { label: "نام برند", value: "Kingtex" },
      { label: "کاربرد", value: "کوهنوردی چند روزه" },
      { label: "جنس رویی", value: "نوبوک (چرم طبیعی گاو)" },
      { label: "نوع کفش", value: "معمولی" },
      { label: "جنس زیره", value: "Vibram" },
      { label: "وزن", value: "640 گرم" },
      { label: "خاصیت ضدآب", value: "دارد" },
    ]),
  },
  {
    name: "کفش ورزشی مردانه باشگاهی نایک",
    slug: "nike-gym-3",
    category: "کفش کوهنوردی و ورزشی",
    brand: "Nike",
    price: 2890000,
    discountPercent: 15,
    discountPrice: 2456500,
    thumbnail: "https://picsum.photos/seed/nike-gym-3/400/400",
    images: JSON.stringify([
      "https://picsum.photos/seed/nike-gym-3a/400/400",
      "https://picsum.photos/seed/nike-gym-3b/400/400",
      "https://picsum.photos/seed/nike-gym-3c/400/400",
      "https://picsum.photos/seed/nike-gym-3d/400/400",
    ]),
    rating: 4.4,
    reviewsCount: 30,
    description:
      "کفش ورزشی مردانه باشگاهی نایک با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند Nike.",
    stock: 35,
    isAvailable: true,
    soldCount: 190,
    viewsCount: 1800,
    colors: JSON.stringify([
      { name: "سفید", hex: "#FFFFFF" },
      { name: "مشکی", hex: "#111111" },
    ]),
    sizes: JSON.stringify([39, 40, 41, 42, 43]),
    specifications: JSON.stringify([
      { label: "نام برند", value: "Nike" },
      { label: "کاربرد", value: "تمرین و باشگاه" },
      { label: "جنس رویی", value: "مش تنفس‌پذیر" },
      { label: "نوع کفش", value: "بدون بند (کشی)" },
      { label: "جنس زیره", value: "EVA" },
      { label: "وزن", value: "310 گرم" },
      { label: "خاصیت ضدآب", value: "ندارد" },
    ]),
  },
  {
    name: "کفش فوتسال مردانه حرفه‌ای",
    slug: "futsal-pro-5",
    category: "کفش کوهنوردی و ورزشی",
    brand: "Novoro",
    price: 2150000,
    discountPercent: 10,
    discountPrice: 1935000,
    thumbnail: "https://picsum.photos/seed/futsal-pro-5/400/400",
    images: JSON.stringify([
      "https://picsum.photos/seed/futsal-pro-5a/400/400",
      "https://picsum.photos/seed/futsal-pro-5b/400/400",
      "https://picsum.photos/seed/futsal-pro-5c/400/400",
      "https://picsum.photos/seed/futsal-pro-5d/400/400",
    ]),
    rating: 4.3,
    reviewsCount: 20,
    description:
      "کفش فوتسال مردانه حرفه‌ای با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند Novoro.",
    stock: 28,
    isAvailable: true,
    soldCount: 140,
    viewsCount: 1200,
    colors: JSON.stringify([
      { name: "قرمز", hex: "#B91C1C" },
      { name: "مشکی", hex: "#111111" },
    ]),
    sizes: JSON.stringify([39, 40, 41, 42]),
    specifications: JSON.stringify([
      { label: "نام برند", value: "Novoro" },
      { label: "کاربرد", value: "فوتسال" },
      { label: "جنس رویی", value: "چرم مصنوعی" },
      { label: "نوع کفش", value: "بندی" },
      { label: "جنس زیره", value: "لاستیک فوتسال" },
      { label: "وزن", value: "290 گرم" },
      { label: "خاصیت ضدآب", value: "ندارد" },
    ]),
  },
  {
    name: "کفش کوهنوردی مردانه مدل MARASUSA",
    slug: "marasusa-6",
    category: "کفش کوهنوردی و ورزشی",
    brand: "Kingtex",
    price: 3450000,
    discountPercent: 20,
    discountPrice: 2760000,
    thumbnail: "https://picsum.photos/seed/marasusa-6/400/400",
    images: JSON.stringify([
      "https://picsum.photos/seed/marasusa-6a/400/400",
      "https://picsum.photos/seed/marasusa-6b/400/400",
      "https://picsum.photos/seed/marasusa-6c/400/400",
      "https://picsum.photos/seed/marasusa-6d/400/400",
    ]),
    rating: 4.5,
    reviewsCount: 18,
    description:
      "کفش کوهنوردی مردانه مدل MARASUSA با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند Kingtex.",
    stock: 22,
    isAvailable: true,
    soldCount: 95,
    viewsCount: 980,
    colors: JSON.stringify([
      { name: "خاکستری", hex: "#6B7280" },
      { name: "قرمز", hex: "#B91C1C" },
    ]),
    sizes: JSON.stringify([40, 41, 42, 43]),
    specifications: JSON.stringify([
      { label: "نام برند", value: "Kingtex" },
      { label: "کاربرد", value: "صخره‌نوردی و کوهنوردی" },
      { label: "جنس رویی", value: "چرم و مش ترکیبی" },
      { label: "نوع کفش", value: "بندی" },
      { label: "جنس زیره", value: "Vibram" },
      { label: "وزن", value: "680 گرم" },
      { label: "خاصیت ضدآب", value: "دارد" },
    ]),
  },
  {
    name: "چادر صحرایی کینگ کمپ مدل MARASUSA",
    slug: "kingcamp-marasusa-8",
    category: "کوله و تجهیزات کوهنوردی",
    brand: "King Camp",
    price: 2540000,
    discountPercent: 25,
    discountPrice: 1905000,
    thumbnail: "https://picsum.photos/seed/kingcamp-marasusa-8/400/400",
    images: JSON.stringify([
      "https://picsum.photos/seed/kingcamp-marasusa-8a/400/400",
      "https://picsum.photos/seed/kingcamp-marasusa-8b/400/400",
      "https://picsum.photos/seed/kingcamp-marasusa-8c/400/400",
      "https://picsum.photos/seed/kingcamp-marasusa-8d/400/400",
    ]),
    rating: 4.1,
    reviewsCount: 9,
    description:
      "چادر صحرایی کینگ کمپ مدل MARASUSA با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند King Camp.",
    stock: 14,
    isAvailable: true,
    soldCount: 55,
    viewsCount: 700,
    colors: JSON.stringify([
      { name: "سبز", hex: "#4B5320" },
      { name: "نارنجی", hex: "#EA580C" },
    ]),
    sizes: JSON.stringify([]),
    specifications: JSON.stringify([
      { label: "نام برند", value: "King Camp" },
      { label: "کاربرد", value: "کمپینگ خانوادگی" },
      { label: "جنس", value: "پلی‌استر ضدآب" },
      { label: "ظرفیت", value: "2-3 نفره" },
      { label: "وزن", value: "3.5 کیلوگرم" },
      { label: "خاصیت ضدآب", value: "دارد" },
    ]),
  },
];

async function retryFailed() {
  console.log(`در حال ارسال ${failedProducts.length} محصول ناموفق...`);
  let successCount = 0;

  for (const product of failedProducts) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(`✅ [${data.category}] ${data.name} (id: ${data.id})`);
      successCount++;
    } catch (err) {
      console.error(`❌ خطا در ارسال "${product.name}":`, err.message);
    }
    await sleep(400); // تاخیر بین درخواست‌ها برای جلوگیری از خطای شبکه
  }

  console.log(`\nتمام شد. ${successCount} از ${failedProducts.length} محصول با موفقیت اضافه شد.`);
}

async function main() {
  await cleanupFakeRecords();
  await retryFailed();
}

main();
