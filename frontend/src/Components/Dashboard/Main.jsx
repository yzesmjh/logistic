import { BASE_URL } from "../../config";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useHeaderData from "../../Hooks/useHeaderData";

const BaseUrl = BASE_URL;

// ── Status badge config ──────────────────────────────────────────────────────
const STATUS_MAP = {
  Delivered:   { badge: "bg-green-100 text-green-700",   dot: "bg-green-500"  },
  "In Transit":{ badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-500"   },
  Processed:   { badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  "Picked Up": { badge: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  "On Hold":   { badge: "bg-red-100 text-red-700",       dot: "bg-red-500"    },
};
const getStatus = (s) =>
  STATUS_MAP[s] ?? { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };

// ── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function DashboardMain() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useHeaderData();

  const fetchPackages = useCallback(async () => {
    if (!userInfo?._id) return;
    try {
      const { status, data } = await axios.get(
        `${BaseUrl}package/getallPackages?userId=${userInfo._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPackages(status === 200 ? data?.data ?? [] : []);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, [token, userInfo?._id]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // ── Computed stats ──────────────────────────────────────────────────────
  const stats = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: "📦",
      gradient: "from-blue-500 to-blue-600",
      desc: "All time",
    },
    {
      label: "Delivered",
      value: packages.filter((p) => p.status === "Delivered").length,
      icon: "✅",
      gradient: "from-green-500 to-green-600",
      desc: "Successfully completed",
    },
    {
      label: "In Transit",
      value: packages.filter((p) => p.status === "In Transit").length,
      icon: "🚚",
      gradient: "from-orange-500 to-orange-600",
      desc: "Currently moving",
    },
    {
      label: "On Hold",
      value: packages.filter((p) => p.status === "On Hold").length,
      icon: "⏸️",
      gradient: "from-red-500 to-red-600",
      desc: "Needs attention",
    },
  ];

  const recent = packages.slice(0, 5);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

        {/* ── Welcome banner ────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-5 sm:p-7 text-white">
          {/* decorative blobs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-blue-200 text-sm font-medium mb-1">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              Welcome back, {userInfo?.firstname ?? "there"} 👋
            </h2>
            <p className="text-blue-100 text-sm mt-1 max-w-md">
              Here&apos;s a live snapshot of your logistics activity.
            </p>
          </div>
        </div>

        {/* ── Stat cards ────────────────────────────────────────────── */}
        {loading ? <Skeleton /> : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-xl mb-3 shadow-sm`}>
                  {s.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">{s.value}</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Recent shipments ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900">Recent Shipments</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last {Math.min(5, recent.length)} of {packages.length}</p>
            </div>
            <Link
              to="/package"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-9 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-5xl mb-3">📭</p>
              <p className="font-semibold text-gray-600">No shipments yet</p>
              <p className="text-sm text-gray-400 mt-1">Packages you create will appear here.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {["Tracking #", "Recipient", "Destination", "Status", "Date"].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recent.map((pkg) => {
                      const { badge, dot } = getStatus(pkg.status);
                      return (
                        <tr
                          key={pkg._id}
                          className="hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="px-5 py-3.5 font-mono text-xs text-gray-500">
                            {pkg.packageNumber ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 font-medium text-gray-800 max-w-[160px] truncate">
                            {pkg.receiverInformation ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 max-w-[140px] truncate">
                            {pkg.destination ?? "—"}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                              {pkg.status ?? "Unknown"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                            {pkg.createdAt
                              ? new Date(pkg.createdAt).toLocaleDateString("en-GB", {
                                  day: "2-digit", month: "short", year: "numeric",
                                })
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden divide-y divide-gray-100">
                {recent.map((pkg) => {
                  const { badge } = getStatus(pkg.status);
                  return (
                    <div key={pkg._id} className="px-4 py-3.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[11px] text-gray-400">
                          {pkg.packageNumber ?? "—"}
                        </span>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}>
                          {pkg.status ?? "Unknown"}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {pkg.receiverInformation ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {pkg.destination ?? "—"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Quick actions ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              to: "/package",
              emoji: "📦",
              emojiColor: "bg-blue-50 group-hover:bg-blue-100",
              title: "View All Packages",
              desc: `${packages.length} total shipment${packages.length !== 1 ? "s" : ""}`,
              arrowColor: "group-hover:text-blue-500",
              border: "hover:border-blue-200",
            },
            {
              to: "/profile",
              emoji: "👤",
              emojiColor: "bg-purple-50 group-hover:bg-purple-100",
              title: "My Profile",
              desc: "Update details & password",
              arrowColor: "group-hover:text-purple-500",
              border: "hover:border-purple-200",
            },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className={`group flex items-center space-x-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md ${a.border} transition-all duration-200`}
            >
              <div className={`w-12 h-12 ${a.emojiColor} rounded-xl flex items-center justify-center text-2xl transition-colors flex-shrink-0`}>
                {a.emoji}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-300 ${a.arrowColor} transition-colors ml-auto flex-shrink-0`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
