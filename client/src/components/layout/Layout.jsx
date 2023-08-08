import { Outlet } from "react-router-dom";
import "./layout.css";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <header className="d-flex align-item-center justify-content-center bg-white">
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
