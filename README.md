# Bright Education — boshqaruv moduli (1-bosqich, lokal)

## Fayllar
auth.html (kirish/ro'yxat) · app.html (kabinet) · core.js · app.js · style.css · site-auth.js

## Mavjud index.html ga faqat 2 ta qator qo'shing (qolgan dizayn o'zgarmaydi)
1) <header> ichida "Bog'lanish" tugmasi oldiga:
   <a class="btn o" id="authBtn" href="auth.html" style="padding:10px 18px">KIRISH</a>
2) </body> dan oldin:
   <script src="site-auth.js"></script>
Hamma fayllarni index.html bilan bir papkaga qo'ying va index.html ni oching (yoki `python3 -m http.server`).

## Kirish
admin / rahbar / buxgalter — parollar siz bergan; kodda faqat SHA-256 xesh saqlanadi.
Register qilganlar faqat "Oddiy foydalanuvchi" bo'ladi; rolni Admin → Foydalanuvchilar da beradi.

## Muhim
- Bu lokal prototip: localStorage brauzerda tahrirlanishi mumkin. HAQIQIY o'quvchi/moliya ma'lumotini kiritmang.
- Hostingdan oldin Appwrite Auth + Database + server ruxsatlariga o'ting (2-bosqich).
- Admin → Tizim → "Demo ma'lumot" soxta o'quvchilar qo'shadi.

## Yangi qoidalar
- Kirgandan so'ng bosh sahifada chap sidebar chiqadi (☰ tugmasi bilan yopiladi/ochiladi).
- Rahbar: Buxgalteriya panelini ko'radi, lekin o'zgartira olmaydi. Admin hamma joyda o'zgartira oladi.
- Eski oylar (qo'shilgan oydan keyingi va joriy oydan oldingi) kirim yozilmagan bo'lsa "To'langan" ko'rsatiladi; bu faqat ko'rinish, moliyaga kirim yozmaydi.
- Yangi o'quvchining birinchi oyi "Sinovda" (qarz yo'q). Admin ⚙ tugmasi bilan istalgan oyni qo'lda belgilaydi.

## Oddiy akkaunt
Faqat "O'quvchilar" bo'limini ko'radi (o'zgartira olmaydi). Summalar yashirilgan; ko'rsatish uchun app.js dagi `const LIM=...` qatorini `false` qiling.
Mehmonlar (kirmaganlar) ham ☰ tugmasini ko'radi, ammo hamma bo'lim qulflangan.

## Fan havolalari (yangi)
- Fan kartasini bosganda endi "Biz bilan bog'laning" emas, shu fan ustozlari va ularning havolalari chiqadi (subjects.js).
- Link turi avtomatik: youtube → "YouTube kanal", t.me → "Telegram guruh", instagram → "Dars jarayoni".
- Qo'shish: Kirish (admin) → Admin → "Fan havolalari" → ustoz yonidagi "＋ Havola": 1-qator Source, 2-qator Link.
- Havolalar hozircha brauzer localStorage'da (kalit: bright_links_v1); Appwrite'ga 2-bosqichda o'tkaziladi.
- Index.html bilan birga subjects.js ham bir papkada turishi kerak.
