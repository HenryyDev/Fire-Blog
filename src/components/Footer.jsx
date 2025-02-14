import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>Fire Blog &copy; {anoAtual}</p>
    </footer>
  );
};

export default Footer;
