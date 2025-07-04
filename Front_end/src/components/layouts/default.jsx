import { Outlet } from "react-router-dom";

import Header from "../app/Header";
import Sidebar from "../app/Sidebar";
import Footer from "../app/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Sidebar />
      <div className="h-full flex-1 ml-[var(--space-left)]">
        <Header />
        <div
          id="content"
          className="p-4 min-h-[calc(100%-var(--header-height)-var(--footer-height))]"
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
