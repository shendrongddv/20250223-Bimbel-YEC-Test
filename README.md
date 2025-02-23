# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-repo-url.git
cd your-repo-directory
```

### Install dependencies

Using pnpm:

```bash
pnpm install
```

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Run the development server

Using pnpm:

```bash
pnpm run dev
```

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

## Technical Test: User Management Dashboard

Buatlah aplikasi sederhana "User Management Dashboard" yang memungkinkan pengguna untuk melihat, menambahkan, mengedit, dan menghapus data pengguna. Data pengguna akan diambil dari API eksternal menggunakan Axios dan dikelola menggunakan Redux untuk state management.

### Spesifikasi

#### Halaman Utama (User List)

[✔️] Menampilkan daftar pengguna dalam bentuk tabel
[✔️] Data diambil dari API: https://jsonplaceholder.typicode.com/users  
[✔️] Kolom tabel: ID, Nama, Email, Perusahaan, Aksi (Edit & Hapus)  
[✔️] Fitur pencarian berdasarkan nama dan email (menggunakan Redux untuk menyimpan state pencarian)

#### Halaman Tambah/Edit Pengguna

[✔️] Form berisi input: Nama, Email, Alamat, dan Perusahaan  
[✔️] Jika form dibuka dari tombol Edit, data yang diisi sesuai dengan data pengguna yang dipilih  
[✔️] Jika form dibuka dari tombol Tambah Pengguna, maka form kosong  
[✔️] Submit form akan mengubah state di Redux

#### Fitur Hapus Pengguna

[✔️] Terdapat tombol "Hapus" di setiap baris tabel  
[✔️] Menghapus pengguna akan menghapus data dari Redux state (tidak perlu memanggil API delete)  
[✔️] Konfirmasi sebelum menghapus data (gunakan window.confirm atau modal)

### Teknologi yang Wajib Digunakan

[✔️] React.js untuk UI  
[✔️] Axios untuk mengambil data dari API  
[✔️] Redux sebagai state management (gunakan Redux Toolkit lebih baik)  
[✔️] React Router untuk navigasi antar halaman  
[✔️] Tailwind CSS / Bootstrap diperbolehkan untuk styling

### Kriteria Penilaian

- Kode bersih, terstruktur, dan mudah dibaca
- Menggunakan Redux dengan baik untuk state management
- Menggunakan Axios dengan efisien untuk komunikasi API
- Aplikasi berjalan dengan baik sesuai dengan spesifikasi
- UI responsif dan memiliki pengalaman pengguna yang baik
- Pastikan Validasi Field Berjalan dengan baik

### Ketentuan Pengumpulan

- Kumpulkan di repository github
- Pastikan akses repository public
- Sertakan panduan Readme untuk init (lebih baik jika sudah di docker)
- Kirimkan link tersebut pada HR Brofesional melalui WA 0823-2842-1072 (Anggi)
