export default function NotificationsMain() {
  // Placeholder data — swap for a real API fetch when the backend endpoint is ready
  const notifications = [];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-5">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {notifications.length === 0
                ? "You're all caught up"
                : `${notifications.length} notification${notifications.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {notifications.length > 0 && (
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Mark all as read
            </button>
          )}
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">🔔</p>
              <p className="font-semibold text-gray-600 text-lg">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                Shipment updates, system alerts, and messages will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((n, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                    !n.read ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                    !n.read ? "bg-blue-500" : "bg-gray-200"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
