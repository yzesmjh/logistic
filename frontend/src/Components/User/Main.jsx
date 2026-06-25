import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import UserPagination from "../UserPagination";
import useHeaderData from "../../Hooks/useHeaderData";
import UserDataComponent from "../UserDataComponent";
import Modal from "../Modal";
import AddUserForm from "../AddUserForm";
import { BASE_URL } from "../../config";

export default function UsersMain() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useHeaderData();

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const { status, data } = await axios.get(`${BASE_URL}users/getallusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(status === 200 ? data?.data ?? [] : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

        {/* ── Header bar ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {users.length} registered user{users.length !== 1 ? "s" : ""}
            </p>
          </div>

          {userInfo?.role === "ADMIN" && (
            <div className="w-full sm:w-44">
              <Modal
                caption="+ Add New User"
                captionButton={true}
                modalContent={<AddUserForm />}
              />
            </div>
          )}
        </div>

        {/* ── Content card ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading users…</p>
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">👥</p>
              <p className="font-semibold text-gray-600 text-lg">No users found</p>
              <p className="text-sm text-gray-400 mt-1">
                Add a new user to get started.
              </p>
            </div>
          ) : (
            <UserPagination
              data={users}
              RenderComponent={UserDataComponent}
              title=""
              pageLimit={5}
              dataLimit={10}
            />
          )}
        </div>

      </div>
    </div>
  );
}
