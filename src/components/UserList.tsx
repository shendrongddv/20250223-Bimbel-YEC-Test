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
    <div className="container space-y-12">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="hidden text-2xl font-bold md:block">User List</h2>

        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          className="block w-full max-w-sm rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          value={searchQuery}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            console.log(
              "Memperbarui nilai pencarian di Redux:",
              e.target.value,
            );
          }}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
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
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 bg-white last:border-0 hover:bg-gray-50"
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
                    Delete
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
