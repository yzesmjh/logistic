import { Menu, Transition } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavItemDropdown = ({ name, menuItems, bottomLinkText }) => {
  const isMarketplace = name === "Design & Print";

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-lg mx-1 transition-all duration-200 group">
          {name}
          {menuItems && menuItems.length > 0 && (
            <svg
              className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-72 origin-top-left bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
          <div className="py-2">
            {menuItems.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-purple-50 text-purple-700" : "text-gray-700",
                      "block px-4 py-3 text-sm font-medium transition-colors duration-150 border-l-4 border-transparent hover:border-purple-500"
                    )}
                  >
                    {item}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>

          {bottomLinkText && (
            <div
              className={classNames(
                "py-3 px-4 text-center border-t border-gray-100",
                isMarketplace ? "bg-orange-50" : "bg-gray-50"
              )}
            >
              <a
                href="#"
                className={classNames(
                  "text-xs uppercase font-bold transition-colors duration-150",
                  isMarketplace
                    ? "text-orange-600 hover:text-orange-700"
                    : "text-blue-600 hover:text-blue-700"
                )}
              >
                {bottomLinkText}
              </a>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavItemDropdown;
