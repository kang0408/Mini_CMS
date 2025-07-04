import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex-1 h-full relative bg-gray-100">
      <Outlet />
    </div>
  );
}
