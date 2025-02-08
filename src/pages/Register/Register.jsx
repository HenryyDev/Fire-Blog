import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
const Register = () => {
  return (
    <div className={styles.register}>
      <h1>
        Cadastre-se no Fire <b>Blog</b>
      </h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <div className={styles.wrap_form}>
        <form>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Nome do usuário"
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email do usuário"
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Digite sua senha"
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme sua senha"
            />
          </label>
          <button className="btn">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
