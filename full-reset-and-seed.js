// full-reset-and-seed.js
// اجرا: node full-reset-and-seed.js
//
// این اسکریپت:
// 1) همه رکوردهای فعلی resource را (چه جفک چه واقعی) واکشی و حذف می‌کند
// 2) از صفر 36 محصول واقعی (6 کتگوری × 6 محصول) را دوباره seed می‌کند
//
// هشدار: بعد از این دیگر schema را در پنل mockapi ادیت نکنید،
// چون هر بار schema را دست بزنید mockapi دیتای موجود در ظرفیت پیش‌فرض
// resource را با دیتای فیک بازنویسی می‌کند.

const BASE_URL = "https://6a72d3694d741b02b1f7cbff.mockapi.io/products";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------- بخش 1: حذف همه رکوردهای موجود ----------

async function deleteAllRecords() {
  console.log("در حال واکشی لیست فعلی رکوردها...");
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`خطا در واکشی لیست: HTTP ${res.status}`);
  const records = await res.json();
  console.log(`${records.length} رکورد پیدا شد. در حال حذف...`);

  let deletedCount = 0;
  for (const record of records) {
    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      try {
        const delRes = await fetch(`${BASE_URL}/${record.id}`, { method: "DELETE" });
        if (!delRes.ok) throw new Error(`HTTP ${delRes.status}`);
        console.log(`🗑️  حذف شد: id ${record.id}`);
        success = true;
        deletedCount++;
      } catch (err) {
        console.error(`⚠️  تلاش ${attempt} برای id ${record.id} ناموفق: ${err.message}`);
        if (attempt < 3) await sleep(800 * attempt);
      }
    }
    await sleep(300);
  }
  console.log(`پاک‌سازی تمام شد. ${deletedCount} از ${records.length} رکورد حذف شد.\n`);
}

// ---------- بخش 2: تعریف 36 محصول (6 کتگوری × 6 محصول) ----------

const colorPalette = [
  { name: "آبی", hex: "#1E3A8A" },
  { name: "مشکی", hex: "#111111" },
  { name: "قرمز", hex: "#B91C1C" },
  { name: "سفید", hex: "#FFFFFF" },
  { name: "خاکستری", hex: "#6B7280" },
  { name: "نارنجی", hex: "#EA580C" },
  { name: "صورتی", hex: "#DB2777" },
  { name: "زرد", hex: "#EAB308" },
];

function randomPick(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function slugify(text, index) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${index}`
  );
}

const categories = [
  {
    category: "کفش کوهنوردی و ورزشی",
    items: [
      { name: "کفش کوهنوردی زنانه کینگتکس مدل DENA", brand: "Kingtex", price: 2350000, hasSize: true, specs: [
        { label: "نام برند", value: "Kingtex" }, { label: "کاربرد", value: "کوهنوردی چند روزه" },
        { label: "جنس رویی", value: "نوبوک (چرم طبیعی گاو)" }, { label: "نوع کفش", value: "معمولی" },
        { label: "جنس زیره", value: "Vibram" }, { label: "وزن", value: "640 گرم" }, { label: "خاصیت ضدآب", value: "دارد" },
      ]},
      { name: "کفش کوهنوردی مردانه مدل RUNNER", brand: "Kingtex", price: 3980000, hasSize: true, specs: [
        { label: "نام برند", value: "Kingtex" }, { label: "کاربرد", value: "کوهنوردی حرفه‌ای" },
        { label: "جنس رویی", value: "چرم مصنوعی مقاوم" }, { label: "نوع کفش", value: "بندی بلند" },
        { label: "جنس زیره", value: "Vibram" }, { label: "وزن", value: "710 گرم" }, { label: "خاصیت ضدآب", value: "دارد" },
      ]},
      { name: "کفش ورزشی مردانه باشگاهی نایک", brand: "Nike", price: 2890000, hasSize: true, specs: [
        { label: "نام برند", value: "Nike" }, { label: "کاربرد", value: "تمرین و باشگاه" },
        { label: "جنس رویی", value: "مش تنفس‌پذیر" }, { label: "نوع کفش", value: "بدون بند (کشی)" },
        { label: "جنس زیره", value: "EVA" }, { label: "وزن", value: "310 گرم" }, { label: "خاصیت ضدآب", value: "ندارد" },
      ]},
      { name: "کفش پیاده‌روی زنانه اسپرت", brand: "SpeedFly", price: 1750000, hasSize: true, specs: [
        { label: "نام برند", value: "SpeedFly" }, { label: "کاربرد", value: "پیاده‌روی روزانه" },
        { label: "جنس رویی", value: "مش سبک" }, { label: "نوع کفش", value: "کشی" },
        { label: "جنس زیره", value: "لاستیک TPR" }, { label: "وزن", value: "260 گرم" }, { label: "خاصیت ضدآب", value: "ندارد" },
      ]},
      { name: "کفش فوتسال مردانه حرفه‌ای", brand: "Novoro", price: 2150000, hasSize: true, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "فوتسال" },
        { label: "جنس رویی", value: "چرم مصنوعی" }, { label: "نوع کفش", value: "بندی" },
        { label: "جنس زیره", value: "لاستیک فوتسال" }, { label: "وزن", value: "290 گرم" }, { label: "خاصیت ضدآب", value: "ندارد" },
      ]},
      { name: "کفش کوهنوردی مردانه مدل MARASUSA", brand: "Kingtex", price: 3450000, hasSize: true, specs: [
        { label: "نام برند", value: "Kingtex" }, { label: "کاربرد", value: "صخره‌نوردی و کوهنوردی" },
        { label: "جنس رویی", value: "چرم و مش ترکیبی" }, { label: "نوع کفش", value: "بندی" },
        { label: "جنس زیره", value: "Vibram" }, { label: "وزن", value: "680 گرم" }, { label: "خاصیت ضدآب", value: "دارد" },
      ]},
    ],
  },
  {
    category: "کوله و تجهیزات کوهنوردی",
    items: [
      { name: "کوله پشتی کوهنوردی 45 لیتری Mountain", brand: "Mountain", price: 3200000, hasSize: false, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "کوهنوردی و کمپینگ" },
        { label: "جنس", value: "نایلون 600D" }, { label: "ظرفیت", value: "45 لیتر" },
        { label: "وزن", value: "1.2 کیلوگرم" }, { label: "خاصیت ضدآب", value: "دارد (کاور جدا)" },
      ]},
      { name: "چادر صحرایی کینگ کمپ مدل MARASUSA", brand: "King Camp", price: 2540000, hasSize: false, specs: [
        { label: "نام برند", value: "King Camp" }, { label: "کاربرد", value: "کمپینگ خانوادگی" },
        { label: "جنس", value: "پلی‌استر ضدآب" }, { label: "ظرفیت", value: "2-3 نفره" },
        { label: "وزن", value: "3.5 کیلوگرم" }, { label: "خاصیت ضدآب", value: "دارد" },
      ]},
      { name: "کیسه خواب کوهنوردی 1.8 متری", brand: "WarmNest", price: 980000, hasSize: false, specs: [
        { label: "نام برند", value: "WarmNest" }, { label: "کاربرد", value: "کمپینگ و کوهنوردی" },
        { label: "جنس", value: "پارچه پلی‌استر با لایه پر مصنوعی" }, { label: "طول", value: "1.8 متر" },
        { label: "وزن", value: "1.1 کیلوگرم" }, { label: "خاصیت ضدآب", value: "مقاوم به رطوبت" },
      ]},
      { name: "عصای کوهنوردی جفتی تاشو", brand: "TrekLite", price: 890000, hasSize: false, specs: [
        { label: "نام برند", value: "TrekLite" }, { label: "کاربرد", value: "کوهنوردی و ترکینگ" },
        { label: "جنس", value: "آلومینیوم سبک" }, { label: "قابلیت", value: "تنظیم ارتفاع و تاشو" }, { label: "وزن", value: "480 گرم (جفت)" },
      ]},
      { name: "ظرف غذا و تغذیه مخصوص کوهنوردی و سفر", brand: "TrekLite", price: 385000, hasSize: false, specs: [
        { label: "نام برند", value: "TrekLite" }, { label: "کاربرد", value: "نگهداری و حمل غذا در سفر" },
        { label: "جنس", value: "استیل ضدزنگ" }, { label: "ظرفیت", value: "1.2 لیتر" }, { label: "وزن", value: "420 گرم" },
      ]},
      { name: "کلاه محافظ دوچرخه‌سواری حرفه‌ای Limar", brand: "Limar", price: 1450000, hasSize: false, specs: [
        { label: "نام برند", value: "Limar" }, { label: "کاربرد", value: "دوچرخه‌سواری حرفه‌ای" },
        { label: "جنس", value: "پلی‌کربنات با تهویه" }, { label: "وزن", value: "260 گرم" }, { label: "قابلیت تنظیم", value: "دارد" },
      ]},
    ],
  },
  {
    category: "پوشاک ورزشی",
    items: [
      { name: "ست ورزشی مردانه باشگاهی نایک", brand: "Nike", price: 1430000, hasSize: true, specs: [
        { label: "نام برند", value: "Nike" }, { label: "کاربرد", value: "تمرین و باشگاه" },
        { label: "جنس", value: "پلی‌استر کشی" }, { label: "شامل", value: "تیشرت و شلوارک" },
      ]},
      { name: "کاپشن کوهنوردی ضدآب مردانه", brand: "Mountain", price: 2650000, hasSize: true, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "کوهنوردی و کوهستان" },
        { label: "جنس", value: "پارچه ضدآب و بادگیر" }, { label: "قابلیت", value: "کلاه‌دار و جیب چندگانه" },
      ]},
      { name: "بارانی سفری قابل تاشو", brand: "TrekLite", price: 420000, hasSize: true, specs: [
        { label: "نام برند", value: "TrekLite" }, { label: "کاربرد", value: "سفر و کمپینگ" },
        { label: "جنس", value: "پلی‌اتیلن ضدآب" }, { label: "قابلیت", value: "تاشو و سبک" },
      ]},
      { name: "شلوار کوهنوردی مردانه ضدآب", brand: "Mountain", price: 1590000, hasSize: true, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "کوهنوردی" },
        { label: "جنس", value: "نایلون ضدآب و ضدخش" }, { label: "قابلیت", value: "زیپ تهویه" },
      ]},
      { name: "تیشرت ورزشی زنانه تنفس‌پذیر", brand: "SpeedFly", price: 350000, hasSize: true, specs: [
        { label: "نام برند", value: "SpeedFly" }, { label: "کاربرد", value: "دویدن و تمرین" }, { label: "جنس", value: "پلی‌استر مش تهویه‌دار" },
      ]},
      { name: "شورت بدنسازی مردانه", brand: "Novoro", price: 290000, hasSize: true, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "بدنسازی و تمرین" }, { label: "جنس", value: "الاستان کشی" },
      ]},
    ],
  },
  {
    category: "لوازم بدنسازی و بوکس",
    items: [
      { name: "دستکش بوکس مارک Reves", brand: "Reves", price: 970000, hasSize: true, specs: [
        { label: "نام برند", value: "Reves" }, { label: "کاربرد", value: "بوکس و کیک بوکسینگ" },
        { label: "جنس", value: "چرم مصنوعی" }, { label: "وزن", value: "12 اونس" },
      ]},
      { name: "کیسه بوکس سرعتی گلاوی مدل Venum", brand: "Venum", price: 540000, hasSize: false, specs: [
        { label: "نام برند", value: "Venum" }, { label: "کاربرد", value: "تمرین سرعت و رفلکس" }, { label: "جنس", value: "چرم مصنوعی مقاوم" },
      ]},
      { name: "طناب ورزشی 1.5 متری مدل 023", brand: "Novoro", price: 98000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "تمرین کاردیو" },
        { label: "جنس", value: "دسته پلاستیکی، سیم فولادی" }, { label: "طول", value: "1.5 متر (قابل تنظیم)" },
      ]},
      { name: "دستکش بدنسازی محافظ بانوانه", brand: "Novoro", price: 345000, hasSize: true, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "بدنسازی و وزنه" }, { label: "جنس", value: "چرم مصنوعی با پد محافظ" },
      ]},
      { name: "دمبل ورزشی لاستیکی جفتی", brand: "Mountain", price: 780000, hasSize: false, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "بدنسازی خانگی" },
        { label: "جنس", value: "روکش لاستیکی، هسته چدن" }, { label: "وزن", value: "هر عدد 5 کیلوگرم" },
      ]},
      { name: "شیکر بدنسازی مدل pro0097", brand: "Novoro", price: 350000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "مکمل و پروتئین" },
        { label: "جنس", value: "پلاستیک بدون BPA" }, { label: "ظرفیت", value: "700 میلی‌لیتر" },
      ]},
    ],
  },
  {
    category: "کیف و ساک ورزشی",
    items: [
      { name: "ساک ورزشی مدل 90 نایک", brand: "Nike", price: 700000, hasSize: false, specs: [
        { label: "نام برند", value: "Nike" }, { label: "کاربرد", value: "باشگاه و سفر کوتاه" },
        { label: "جنس", value: "پلی‌استر مقاوم" }, { label: "ظرفیت", value: "30 لیتر" },
      ]},
      { name: "ساک ورزشی مدل 37xlz9 جردن", brand: "Jordan", price: 640000, hasSize: false, specs: [
        { label: "نام برند", value: "Jordan" }, { label: "کاربرد", value: "باشگاه و سفر" },
        { label: "جنس", value: "نایلون ضدسایش" }, { label: "ظرفیت", value: "28 لیتر" },
      ]},
      { name: "کوله پشتی روزمره اسپرت", brand: "SpeedFly", price: 890000, hasSize: false, specs: [
        { label: "نام برند", value: "SpeedFly" }, { label: "کاربرد", value: "استفاده روزانه و مدرسه" },
        { label: "جنس", value: "پلی‌استر ضدآب" }, { label: "ظرفیت", value: "22 لیتر" },
      ]},
      { name: "کیف لوازم آرایش ورزشی", brand: "Novoro", price: 210000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "نگهداری لوازم شخصی" }, { label: "جنس", value: "پارچه ضدآب" },
      ]},
      { name: "ساک باشگاهی ضدآب", brand: "Mountain", price: 560000, hasSize: false, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "باشگاه و استخر" },
        { label: "جنس", value: "پلی‌استر پوشش‌دار ضدآب" }, { label: "ظرفیت", value: "25 لیتر" },
      ]},
      { name: "کیف کمری دویدن", brand: "SpeedFly", price: 265000, hasSize: false, specs: [
        { label: "نام برند", value: "SpeedFly" }, { label: "کاربرد", value: "دویدن و دوچرخه‌سواری" }, { label: "جنس", value: "نایلون سبک" },
      ]},
    ],
  },
  {
    category: "لوازم جانبی سفر و شنا",
    items: [
      { name: "عینک شنا حرفه‌ای مدل zx9", brand: "Novoro", price: 1970000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "شنای حرفه‌ای" }, { label: "جنس", value: "سیلیکون و پلی‌کربنات ضدبخار" },
      ]},
      { name: "دابر مسافرتی تاشو", brand: "TrekLite", price: 320000, hasSize: false, specs: [
        { label: "نام برند", value: "TrekLite" }, { label: "کاربرد", value: "حمل آب در سفر" },
        { label: "جنس", value: "پلی‌اتیلن بدون BPA" }, { label: "ظرفیت", value: "2 لیتر" },
      ]},
      { name: "ترازوی دیجیتال منزل", brand: "Mountain", price: 480000, hasSize: false, specs: [
        { label: "نام برند", value: "Mountain" }, { label: "کاربرد", value: "اندازه‌گیری وزن بدن" },
        { label: "جنس", value: "شیشه سکوریت" }, { label: "دقت", value: "100 گرم" },
      ]},
      { name: "اسکیت چرخ چهارتایی", brand: "SpeedFly", price: 2150000, hasSize: true, specs: [
        { label: "نام برند", value: "SpeedFly" }, { label: "کاربرد", value: "اسکیت‌سواری تفریحی" }, { label: "جنس", value: "پلی‌یورتان و آلومینیوم" },
      ]},
      { name: "بطری آب ورزشی 750 میلی‌لیتری", brand: "Novoro", price: 185000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "ورزش و باشگاه" },
        { label: "جنس", value: "پلاستیک بدون BPA" }, { label: "ظرفیت", value: "750 میلی‌لیتر" },
      ]},
      { name: "کلاه شنا سیلیکونی", brand: "Novoro", price: 145000, hasSize: false, specs: [
        { label: "نام برند", value: "Novoro" }, { label: "کاربرد", value: "شنا" }, { label: "جنس", value: "سیلیکون نرم" },
      ]},
    ],
  },
];

function buildProducts() {
  const products = [];
  let idCounter = 1;

  for (const catGroup of categories) {
    for (const item of catGroup.items) {
      const discountPercent = [0, 0, 10, 15, 20, 25][Math.floor(Math.random() * 6)];
      const discountPrice = Math.round(item.price * (1 - discountPercent / 100));
      const seed = slugify(item.name, idCounter);

      products.push({
        name: item.name,
        slug: seed,
        category: catGroup.category,
        brand: item.brand,
        price: item.price,
        discountPercent,
        discountPrice,
        thumbnail: `https://picsum.photos/seed/${seed}/400/400`,
        images: JSON.stringify([
          `https://picsum.photos/seed/${seed}a/400/400`,
          `https://picsum.photos/seed/${seed}b/400/400`,
          `https://picsum.photos/seed/${seed}c/400/400`,
          `https://picsum.photos/seed/${seed}d/400/400`,
        ]),
        rating: +(3.6 + Math.random() * 1.4).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 40) + 1,
        description: `${item.name} با کیفیت بالا و طراحی مناسب، ارائه‌شده توسط برند ${item.brand}.`,
        stock: Math.floor(Math.random() * 60) + 5,
        isAvailable: Math.random() > 0.08,
        soldCount: Math.floor(Math.random() * 400),
        viewsCount: Math.floor(Math.random() * 3000),
        colors: JSON.stringify(randomPick(colorPalette, 2 + Math.floor(Math.random() * 2))),
        sizes: item.hasSize
          ? JSON.stringify([38, 39, 40, 41, 42].slice(0, 3 + Math.floor(Math.random() * 3)))
          : JSON.stringify([]),
        specifications: JSON.stringify(item.specs),
      });
      idCounter++;
    }
  }

  return products;
}

// ---------- بخش 3: ارسال محصولات با تاخیر و retry ----------

async function seedProducts() {
  const products = buildProducts();
  console.log(`در حال ارسال ${products.length} محصول تازه...`);
  let successCount = 0;

  for (const product of products) {
    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      try {
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, createdAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log(`✅ [${data.category}] ${data.name} (id: ${data.id})`);
        success = true;
        successCount++;
      } catch (err) {
        console.error(`⚠️  تلاش ${attempt} برای "${product.name}" ناموفق: ${err.message}`);
        if (attempt < 3) await sleep(800 * attempt);
      }
    }
    await sleep(400);
  }

  console.log(`\nseed تمام شد. ${successCount} از ${products.length} محصول با موفقیت اضافه شد.`);
}

async function main() {
  await deleteAllRecords();
  await seedProducts();
}

main();
