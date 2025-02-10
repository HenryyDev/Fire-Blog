import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
const NavBar = () => {
  const [menuOpen, setMenuopen] = useState(false);
  const closeMenu = () => setMenuopen(false);
  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand}>
        <b>FIRE</b>
        <span>BLOG</span>
      </NavLink>
      <button
        className={styles.menuButton}
        onClick={() => setMenuopen(!menuOpen)}
      >
        <img src="./menu.svg" alt="" />
      </button>
      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink
            onClick={closeMenu}
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeMenu}
            to={"/Login"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeMenu}
            to={"/register"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Cadastrar
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeMenu}
            to={"/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
