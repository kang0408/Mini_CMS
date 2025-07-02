import { Outlet } from "react-router-dom";

import Header from "../app/Header";
import Sidebar from "../app/Sidebar";
import Footer from "../app/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 ml-[var(--space-left)] flex flex-col">
        <Header />
        <div id="content" className="flex-1 p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
