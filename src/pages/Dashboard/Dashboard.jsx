import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import { useDeleteDocument } from "../../hooks/UseDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to={"/posts/create"} className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post__header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post__row}>
                <p>{post.title}</p>
                <div className={styles.post__btn}>
                  <Link className="btn btn-outline" to={`/posts/${post.id}`}>
                    ver
                  </Link>
                  <Link
                    className="btn btn-outline"
                    to={`/posts/edit/${post.id}`}
                  >
                    Editar{" "}
                  </Link>
                  <button
                    className="btn btn-outline btn-danger"
                    onClick={() => deleteDocument(post.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
