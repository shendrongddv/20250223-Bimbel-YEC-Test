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
    INITIAL_USER
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block mb-2">Nama:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Alamat:</label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: { ...formData.address, street: e.target.value },
            })
          }
          placeholder="Jalan"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: { ...formData.address, city: e.target.value },
            })
          }
          placeholder="Kota"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Perusahaan:</label>
        <input
          type="text"
          value={formData.company.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: { ...formData.company, name: e.target.value },
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {id ? "Update" : "Tambah"} Pengguna
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default UserForm;
