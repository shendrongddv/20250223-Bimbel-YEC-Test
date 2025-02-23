import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { fetchUsers, deleteUser, setSearchQuery } from "../store/userSlice";
import { PESAN } from "../constants";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, searchQuery } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Nilai pencarian dari Redux:", searchQuery);
  }, [searchQuery]);

  const handleDelete = (id: number) => {
    if (window.confirm(PESAN.KONFIRMASI_HAPUS)) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          className="rounded border p-2"
          value={searchQuery}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            console.log(
              "Memperbarui nilai pencarian di Redux:",
              e.target.value,
            );
          }}
        />
        <Link
          to="/add"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Tambah Pengguna
        </Link>
      </div>

      <div className="w-full overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-50 bg-white last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.company.name}</td>
                <td className="space-x-2 px-6 py-4">
                  <Link
                    to={`/edit/${user.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
