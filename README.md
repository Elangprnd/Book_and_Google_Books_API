# 📚 Book & Google Books API

Sebuah proyek sederhana untuk memahami dan mengimplementasikan **RESTful API** menggunakan Node.js.  
Terdiri dari dua bagian utama: API lokal dengan fitur **CRUD buku** dan koneksi ke **API eksternal Google Books**.  
Proyek ini dibuat sebagai pemenuhan tugas **P2 - KSM Multimedia Web Development**.

---

## ⚠️ DISCLAIMER!!

Untuk menjaga kompatibilitas dan mencegah error versi dependensi antar pengguna, folder `node_modules` tidak disertakan.  
Silakan install ulang dependensi dengan:

```bash
npm install
```

### 📌 Menjalankan Proyek:

1. Inisialisasi project (jika belum):
```bash
npm init -y
```

2. Install dependensi:
```bash
npm install
```

3. Menjalankan aplikasi:
- Untuk Tugas 1:
  - Normal: `npm run start:tugas1`
  - Auto-refresh (nodemon): `npm run dev:tugas1`

- Untuk Tugas 2:
  - Normal: `npm run start:tugas2`
  - Auto-refresh (nodemon): `npm run dev:tugas2`

---

## 🧪 Tugas 1 — CRUD Buku (Local API)

File utama: `tugas1.js`  
Menggunakan **middleware otentikasi** dengan token: `2410512113`  
Endpoint dapat diakses via **Postman**.

### 🔧 Fitur:
- CRUD (Create, Read, Update, Delete)
- Contoh data disediakan untuk masing-masing endpoint
- Auth middleware diaktifkan untuk endpoint tertentu
- Error handling

### 📘 Contoh Endpoint:

#### ✅ CREATE (POST)
- `POST /books`
- `POST /books/secure` *(dengan token)*
- `POST /books/bulk` *(tambah banyak buku sekaligus)*

#### 🔍 READ (GET)
- `GET /books` *(semua buku)*
- `GET /books/:id` *(berdasarkan ID)*
- `GET /books/search/:keyword` *(berdasarkan judul)*

#### ✏️ UPDATE
- `PUT /books/:id` *(update semua data)*
- `PATCH /books/:id/title` *(update judul saja)*
- `PUT /books/secure/:id` *(dengan token)*

#### ❌ DELETE
- `DELETE /books/:id` *(hapus berdasarkan ID)*
- `DELETE /books` *(hapus semua)*
- `DELETE /books/title/:title` *(hapus berdasarkan judul)*

---

## 🌐 Tugas 2 — Google Books API (Eksternal API)

File utama: `tugas2.js`  
Menggunakan **Google Books API** dengan bantuan **Axios**  
Otentikasi token juga digunakan (`2410512113`)

### 🌍 Endpoint:

#### 🧪 Test Server
- `GET /`  
  → Tes koneksi server berjalan

#### 🔎 Cari Buku dari Google Books
- `GET /google-books/:query`  
  → Contoh: `GET /google-books/harry potter`

### 📥 Contoh Output:
```json
[
  {
    "id": "OyB4llvAoXQC",
    "title": "Harry Potter dan pangeran berdarah-campuran",
    "authors": ["J. K. Rowling"],
    "publishedDate": "2006",
    "description": "No description",
    "pageCount": 824,
    "categories": ["Adventure stories"],
    "thumbnail": "http://books.google.com/..."
  }
]
```

### 🛡️ Error Handling
Sama seperti tugas 1, error handling disediakan untuk mempermudah debugging dan pemahaman kesalahan.

---

## ✅ Penutup

Silakan gunakan Postman untuk mencoba seluruh endpoint. Pastikan untuk menyertakan token **2410512113** di header `Authorization` jika diperlukan.

Proyek ini dibuat untuk keperluan **pembelajaran dan tugas akhir P7 KSM Multimedia - Web Development**.
