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
    <div className="mx-auto max-w-lg space-y-8">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium dark:text-white">
            Nama
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium dark:text-white">
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium dark:text-white">
            Alamat
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
            placeholder="Jalan"
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
            className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium dark:text-white">
            Perusahaan
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
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
