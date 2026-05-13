import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SEA</div>

      <nav className="sidebar-menu">
        <NavLink to="/" end>
          <HomeOutlined />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees">
          <UserOutlined />
          <span>Funcionários</span>
        </NavLink>

        <NavLink to="/activities">
          <FileOutlined />
          <span>Atividades</span>
        </NavLink>

        <NavLink to="/relatorios">
          <FileOutlined />
          <span>Relatórios</span>
        </NavLink>

        <NavLink to="/configuracoes">
          <SettingOutlined />
          <span>Configurações</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;