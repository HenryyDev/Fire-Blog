//css

import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <div className={styles.wrap}>
        <h1>Veja os posts mais recentes</h1>
        <form onSubmit={handleSubmit} className={styles.search__form}>
          <input
            type="text"
            placeholder="Ou busque por uma #..."
            onChange={(e) => {
              let tag = e.target.value;
              tag = tag.startsWith("#") ? tag.slice(1) : tag;
              setQuery(tag);
            }}
          />
          <button className="btn btn-dark">Pesquisar</button>
        </form>
      </div>
      <div className={styles.posts}>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to={"/posts/create"} className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
