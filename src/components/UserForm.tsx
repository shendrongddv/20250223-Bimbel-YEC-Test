import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { User } from "../types";
import { addUser, updateUser } from "../store/userSlice";
import { INITIAL_USER, PESAN } from "../constants";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  const [formData, setFormData] = useState<Omit<User, "id"> | User>(
    INITIAL_USER,
  );

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id === parseInt(id));
      if (user) {
        setFormData(user);
      } else {
        navigate("/");
      }
    } else {
      setFormData(INITIAL_USER);
    }
  }, [id, users, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.username) {
      alert(PESAN.ERROR_VALIDASI);
      return;
    }

    try {
      if (id) {
        dispatch(updateUser({ ...(formData as User), id: parseInt(id) }));
      } else {
        dispatch(addUser(formData));
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(PESAN.ERROR_SIMPAN);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {id ? "Edit User" : "Tambah User"}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Informasi Dasar</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Masukkan nama lengkap"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Masukkan username"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="contoh@email.com"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Masukkan nomor telepon"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://website.com"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Alamat</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Jalan
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                placeholder="Masukkan nama jalan"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Suite/Apartemen
              </label>
              <input
                type="text"
                value={formData.address.suite}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, suite: e.target.value },
                  })
                }
                placeholder="Nomor suite/apartemen"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kota
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value },
                  })
                }
                placeholder="Masukkan nama kota"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kode Pos
              </label>
              <input
                type="text"
                value={formData.address.zipcode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, zipcode: e.target.value },
                  })
                }
                placeholder="Masukkan kode pos"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Informasi Perusahaan */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Informasi Perusahaan</h2>

          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Perusahaan
              </label>
              <input
                type="text"
                value={formData.company.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: { ...formData.company, name: e.target.value },
                  })
                }
                placeholder="Masukkan nama perusahaan"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Catch Phrase
              </label>
              <input
                type="text"
                value={formData.company.catchPhrase}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: {
                      ...formData.company,
                      catchPhrase: e.target.value,
                    },
                  })
                }
                placeholder="Slogan perusahaan"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                BS
              </label>
              <input
                type="text"
                value={formData.company.bs}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: { ...formData.company, bs: e.target.value },
                  })
                }
                placeholder="Business strategy"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            {id ? "Perbarui" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
