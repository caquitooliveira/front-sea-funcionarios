import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Stepper from "../components/Stepper/Stepper";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main-layout">
      {/* Sidebar desktop */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>

      {/* Botão hambúrguer mobile */}
      <button
        className="hamburger-button"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      {/* Fundo escuro mobile */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <div className={`sidebar-mobile ${menuOpen ? "open" : ""}`}>
        <button
          className="close-menu-button"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        <Sidebar />
      </div>

      <div className="page-area">
        <div className="stepper-area">
          <Stepper />
        </div>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;