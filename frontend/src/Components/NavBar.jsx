import { navData } from "../utils/data";
import MobileMenu from "./MobileMenu";
import NavItemDropdown from "./NavItemDropdown";
import TrackingDropdown from "./TrackingDropdown";

// Helper function for conditional class names

// Main NavBar Component
export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-purple-800 to-purple-900 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-black text-white tracking-tight uppercase">
              Fedy<span className="text-orange-400">Transit</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {/* Regular dropdown items */}
            {Object.entries(navData).map(([name, data]) => (
              <NavItemDropdown
                key={name}
                name={name}
                menuItems={data.items}
                bottomLinkText={data.bottomLink}
              />
            ))}

            {/* Tracking dropdown */}
            <TrackingDropdown />
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Search Icon - Desktop */}
            <button className="hidden sm:flex p-2 text-white hover:bg-purple-700 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
