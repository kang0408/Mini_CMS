import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const list = [
    {
      icon: "material-symbols:dashboard",
      label: "Dashboard",
      to: "",
    },
    {
      icon: "ix:product",
      label: "Products",
      to: "/products",
    },
    {
      icon: "mdi:user",
      label: "Users",
      to: "/users",
    },
  ];

  return (
    <div
      id="sidebar"
      className="w-[var(--space-left)] bg-primary-300 fixed top-0 bottom-0 left-0 p-4 text-lg shadow-xl"
    >
      <ul>
        {list.map((item) => {
          return (
            <li className="not-last:mb-2" key={item.label}>
              <Link to={item.to}>
                <div className="flex gap-2 items-center hover:opacity-80 hover:text-white transition-all cursor-pointer">
                  <Icon icon={item.icon} className="text-2xl" />
                  <p>{item.label}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
