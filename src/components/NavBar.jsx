import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../hooks/UseAuthentication";
import { useAuthValue } from "../context/AuthContext";
const NavBar = () => {
  const { user } = useAuthValue();
  const [menuOpen, setMenuopen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const changeMenu = () => setMenuopen((prev) => !prev);
  const { logout } = useAuthentication();

  useEffect(() => {
    const closeMenuOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuopen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOutside);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand}>
        <b>FIRE</b>
        <span>BLOG</span>
      </NavLink>
      <button
        ref={menuButtonRef}
        className={styles.menuButton}
        onClick={changeMenu}
      >
        <img src="/menu.svg" alt="icone do menu" />
      </button>
      <ul
        ref={menuRef}
        className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}
      >
        <li>
          <NavLink
            onClick={changeMenu}
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
                onClick={changeMenu}
                to={"/Login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={changeMenu}
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
                onClick={changeMenu}
                to={"/posts/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={changeMenu}
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
            onClick={changeMenu}
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
