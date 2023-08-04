import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
