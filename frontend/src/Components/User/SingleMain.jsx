import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import useHeaderData from "../../Hooks/useHeaderData";
import { useParams } from "react-router-dom";
import DataComponent from "../DataComponent";
import { BASE_URL } from "../../config";

const STATUS_MAP = {
  Delivered:    { badge: "bg-green-100 text-green-700",   dot: "bg-green-500"  },
  "In Transit": { badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-500"   },
  Processed:    { badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  "Picked Up":  { badge: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  "On Hold":    { badge: "bg-red-100 text-red-700",       dot: "bg-red-500"    },
};
const getStatus = (s) =>
  STATUS_MAP[s] ?? { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };

export default function SingleUserMain() {
  const { id }  = useParams();
  const { token } = useHeaderData();

  const [packages,     setPackages]     = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading,      setLoading]      = useState(true);

  const fetchAll = useCallback(async () => {
    if (!token || !id) return;
    try {
      const [pkgRes, userRes] = await Promise.all([
        axios.get(`${BASE_URL}package/getallPackages?userId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}users/getsingleuser?userId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setPackages(pkgRes.status  === 200 ? pkgRes.data?.data  ?? [] : []);
      setSelectedUser(userRes.status === 200 ? userRes.data?.data ?? null : null);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fullName = selectedUser
    ? `${selectedUser.firstname ?? ""} ${selectedUser.lastname ?? ""}`.trim()
    : "User";

  const stats = [
    { label: "Total",       value: packages.length,                                          icon: "📦", grad: "from-blue-500 to-blue-600"   },
    { label: "Delivered",   value: packages.filter(p => p.status === "Delivered").length,    icon: "✅", grad: "from-green-500 to-green-600"  },
    { label: "In Transit",  value: packages.filter(p => p.status === "In Transit").length,   icon: "🚚", grad: "from-orange-500 to-orange-600"},
    { label: "On Hold",     value: packages.filter(p => p.status === "On Hold").length,      icon: "⏸️", grad: "from-red-500 to-red-600"     },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

        {/* ── User profile card ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl flex-shrink-0">
            {selectedUser?.firstname?.[0] ?? "?"}{selectedUser?.lastname?.[0] ?? ""}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900 truncate">{fullName}</h2>
            <p className="text-sm text-gray-400 mt-0.5 truncate">{selectedUser?.email ?? "—"}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                selectedUser?.role === "ADMIN"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {selectedUser?.role ?? "USER"}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                ID: {selectedUser?.customerId ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-lg mb-2`}>
                {s.icon}
              </div>
              <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{s.value}</p>
              <p className="text-sm font-medium text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Packages ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Shipments for {fullName}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{packages.length} total</p>
          </div>

          {packages.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium text-gray-500">No packages for this user</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/60 border-b border-gray-100">
                      {["Tracking #", "Product", "Destination", "Status", "Date"].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {packages.map((pkg) => {
                      const { badge, dot } = getStatus(pkg.status);
                      return (
                        <tr key={pkg._id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs text-gray-500">{pkg.packageNumber ?? "—"}</td>
                          <td className="px-5 py-3 font-medium text-gray-800 max-w-[140px] truncate">{pkg.product ?? pkg.packageName ?? "—"}</td>
                          <td className="px-5 py-3 text-gray-500 max-w-[140px] truncate">{pkg.destination ?? "—"}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                              {pkg.status ?? "Unknown"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                            {pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-gray-100">
                {packages.map((pkg) => {
                  const { badge } = getStatus(pkg.status);
                  return (
                    <div key={pkg._id} className="px-4 py-3.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[11px] text-gray-400">{pkg.packageNumber ?? "—"}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}>{pkg.status ?? "Unknown"}</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm truncate">{pkg.product ?? pkg.packageName ?? "—"}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{pkg.destination ?? "—"}</p>
                    </div>
                  );
                })}
              </div>

              {/* Paginated view (kept for compatibility) */}
              <div className="hidden">
                <Pagination
                  data={packages}
                  RenderComponent={DataComponent}
                  title=""
                  pageLimit={5}
                  dataLimit={10}
                />
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
