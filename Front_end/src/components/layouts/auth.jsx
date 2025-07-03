import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex-1 relative bg-gray-100">
      <Outlet />
    </div>
  );
}
