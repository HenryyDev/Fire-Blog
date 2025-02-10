import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
const Register = () => {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }
    console.log(user);
  };
  return (
    <div className={styles.register}>
      <h1>
        Cadastre-se no Fire <b>Blog</b>
      </h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <div className={styles.wrap_form}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Nome do usuário"
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button className="btn">Cadastrar</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
