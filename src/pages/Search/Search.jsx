import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import { useQuery } from "../../hooks/UseQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search__container}>
      <h1>Resultados da sua busca</h1>
      <div className={styles.posts}>
        {posts && posts.length === 0 && (
          <>
            <div className={styles.nopost}>
              <p>Não foram encontrados posts a partir de sua busca...</p>
              <Link to={"/"} className="btn btn-dark">
                Voltar
              </Link>
            </div>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
