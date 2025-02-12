import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
import { useAuthentication } from "../hooks/UseAuthentication";
import { useAuthValue } from "../context/AuthContext";
const NavBar = () => {
  const { user } = useAuthValue();
  const [menuOpen, setMenuopen] = useState(false);
  const closeMenu = () => setMenuopen(false);
  const { logout } = useAuthentication();
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
        <img src="/menu.svg" alt="icone do menu" />
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
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                onClick={closeMenu}
                to={"/posts/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            onClick={closeMenu}
            to={"/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
