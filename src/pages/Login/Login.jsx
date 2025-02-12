import styles from "./Login.module.css";
import React, { useEffect, useState } from "react";

import { useAuthentication } from "../../hooks/UseAuthentication";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [viewPassword, setViewPassoword] = useState(false);

  const { login, error: authError, loading } = useAuthentication();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(res);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>
        Entre no Fire <b>Blog</b>
      </h1>
      <p>Faça o login para poder utilizar o sistema </p>
      <div className={styles.wrap_form}>
        <form onSubmit={handleSubmit}>
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
            <div className={styles.password}>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                className={styles.view_password}
                src={viewPassword ? "/noView.svg" : "/view.svg"}
                alt=""
                onClick={() => setViewPassoword((prev) => !prev)}
                height={30}
              />
            </div>
          </label>

          {!loading && <button className="btn">Entrar</button>}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
