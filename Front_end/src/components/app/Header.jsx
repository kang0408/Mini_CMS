import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useMessageProvider } from "../common/Message/Provider";
import Button from "../common/Button";

export default function Header() {
  const navigate = useNavigate();
  const { useMessage } = useMessageProvider();
  const [accessToken] = useState(() => localStorage.getItem("access_token"));
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (!user || !accessToken) {
      navigate("/auth/login");
    }
  }, [user, accessToken]);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    useMessage({
      type: "info",
      message: "Log out",
    });
    navigate("/auth/login");
  };
  return (
    <header className="h-20 bg-white p-2 border-b-1 rounded-b-md shadow-md flex justify-between items-center">
      <div>
        <Button
          icon={theme == "light" ? "ic:round-dark-mode" : "ic:round-light-mode"}
          onClick={changeTheme}
          color={theme == "light" ? "" : "primary"}
        >
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-right">
          <p className="text-lg text-primary-500">
            {user ? user.username : ""}
          </p>
          <p
            className="text-base hover:font-bold cursor-pointer transition-all"
            onClick={logout}
          >
            Đăng xuất
          </p>
        </div>
        <div className="bg-black w-12 h-12 rounded-full border-1">
          <img
            src="/logo-social.png"
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
