// delete-remaining.js
// اجرا: node delete-remaining.js
// حذف رکوردهای الکی باقی‌مانده (id 1 تا 7) با retry در صورت خطای شبکه

const BASE_URL = "https://6a72d3694d741b02b1f7cbff.mockapi.io/products";
const idsToDelete = [1, 2, 3, 4, 5, 6, 7];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteWithRetry(id, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log(`🗑️  حذف شد: id ${id}`);
      return true;
    } catch (err) {
      console.error(`⚠️  تلاش ${attempt} برای id ${id} ناموفق بود: ${err.message}`);
      if (attempt < maxAttempts) await sleep(1000 * attempt); // تاخیر افزایشی
    }
  }
  console.error(`❌ حذف id ${id} کاملاً ناموفق بود.`);
  return false;
}

async function main() {
  console.log("در حال حذف رکوردهای باقی‌مانده...");
  let successCount = 0;

  for (const id of idsToDelete) {
    const ok = await deleteWithRetry(id);
    if (ok) successCount++;
    await sleep(500);
  }

  console.log(`\nتمام شد. ${successCount} از ${idsToDelete.length} رکورد حذف شد.`);
}

main();
