export const API_URL = "https://jsonplaceholder.typicode.com/users";

export const PESAN = {
  KONFIRMASI_HAPUS: "Apakah Anda yakin ingin menghapus pengguna ini?",
  ERROR_VALIDASI: "Nama, username, dan email harus diisi!",
  ERROR_UMUM: "Terjadi kesalahan",
  ERROR_SIMPAN: "Terjadi kesalahan saat menyimpan data!",
};

export const INITIAL_USER = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "0",
      lng: "0",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

export const TABLE_HEADERS = {
  ID: "ID",
  NAMA: "Nama",
  USERNAME: "Username",
  EMAIL: "Email",
  COMPANY: "Perusahaan",
  ACTION: "Aksi",
};
