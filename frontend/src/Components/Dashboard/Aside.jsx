import { NavLink } from "react-router-dom";
import Modal from "../Modal";
import AddUserForm from "../AddUserForm";
import TransferForm from "../TransferForm";
import PropTypes from "prop-types";

// ── Inline SVG icons (no Font Awesome dependency) ──────────────────────────
function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function PackageIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
function LogOutIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}
function CloseIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const NAV = [
  { to: "/dashboard", Icon: HomeIcon,  label: "Dashboard",     end: true  },
  { to: "/package",   Icon: PackageIcon, label: "Packages",    end: false },
  { to: "/profile",   Icon: UserIcon,  label: "Profile",       end: false },
  { to: "/notification", Icon: BellIcon, label: "Notifications", end: false },
];

// ── Component ───────────────────────────────────────────────────────────────
export default function Aside({ user, isOpen, onClose }) {
  const initials = `${user?.firstname?.[0] ?? ""}${user?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-30 flex flex-col
          bg-gradient-to-b from-gray-900 via-gray-900 to-blue-950
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0
        `}
      >
        {/* ── Brand ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <NavLink to="/" className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-extrabold text-xs">FT</span>
            </div>
            <span className="text-white font-extrabold text-base tracking-tight truncate">
              Fedy<span className="text-orange-400">Transit</span>
            </span>
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white transition-colors flex-shrink-0 ml-2"
            aria-label="Close sidebar"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* ── User chip ───────────────────────────────────────────────── */}
        <div className="mx-4 my-3 p-3 rounded-xl bg-white/5 flex items-center space-x-3">
          {user?.profilePicx ? (
            <img
              src={user.profilePicx}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {initials || "?"}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {user?.firstname} {user?.lastname}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                user?.role === "ADMIN"
                  ? "bg-orange-500/20 text-orange-300"
                  : "bg-blue-500/20 text-blue-300"
              }`}
            >
              {user?.role ?? "USER"}
            </span>
          </div>
        </div>

        {/* ── Send Package CTA ────────────────────────────────────────── */}
        <div className="px-4 pb-3">
          <Modal
            caption="＋  Send Package"
            captionButton={true}
            modalContent={<TransferForm token={user?.token} />}
          />
        </div>

        {/* ── Navigation ──────────────────────────────────────────────── */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Admin section */}
          {user?.role === "ADMIN" && (
            <>
              <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 pt-5 pb-1">
                Administration
              </p>
              <NavLink
                to="/users"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <UsersIcon className="w-[18px] h-[18px] flex-shrink-0" />
                <span>Manage Users</span>
              </NavLink>
              <div className="px-2 pt-2">
                <Modal
                  caption="Add New User"
                  captionButton={false}
                  modalContent={<AddUserForm />}
                />
              </div>
            </>
          )}
        </nav>

        {/* ── Sign out ────────────────────────────────────────────────── */}
        <div className="p-3 border-t border-white/10">
          <NavLink
            to="/logout"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOutIcon className="w-[18px] h-[18px] flex-shrink-0" />
            <span>Sign Out</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

Aside.propTypes = {
  user:    PropTypes.object,
  isOpen:  PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
