import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useHeaderData from "../../Hooks/useHeaderData";

const PAGE_TITLES = {
  "/dashboard":    "Dashboard",
  "/package":      "Packages",
  "/profile":      "My Profile",
  "/notification": "Notifications",
  "/users":        "User Management",
};

// ── Icons ───────────────────────────────────────────────────────────────────
function HamburgerIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function BellIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function ChevronDownIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Header({ onMenuClick }) {
  const { userInfo } = useHeaderData();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] ?? "Dashboard";
  const initials = `${userInfo?.firstname?.[0] ?? ""}${userInfo?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      {/* ── Left: hamburger + page title ─────────────────────────────── */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Open navigation"
        >
          <HamburgerIcon className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-gray-800">{title}</h1>
      </div>

      {/* ── Right: bell + avatar ─────────────────────────────────────── */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Notification bell */}
        <Link
          to="/notification"
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </Link>

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center space-x-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            aria-expanded={dropdownOpen}
          >
            {userInfo?.profilePicx ? (
              <img
                src={userInfo.profilePicx}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {initials || "?"}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight max-w-[120px] truncate">
                {userInfo?.firstname} {userInfo?.lastname}
              </p>
              <p className="text-xs text-gray-400 leading-tight">{userInfo?.role}</p>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              {/* Click-outside capture */}
              <button
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setDropdownOpen(false)}
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-20">
                {/* User summary */}
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {userInfo?.firstname} {userInfo?.lastname}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{userInfo?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile settings
                </Link>
                <Link
                  to="/notification"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Notifications
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <Link
                  to="/logout"
                  className="flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Sign Out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
