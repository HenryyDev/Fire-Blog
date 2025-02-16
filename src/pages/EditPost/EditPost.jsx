import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/UseFetchDocument";
import { useUpdateDocument } from "../../hooks/UseUpdateDocument";
const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tags.join(", ");
      setTags(textTags);
    }
  }, [post]);
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    //validar image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => {
      tag.trim().toLowerCase();
      return tag.startsWith("#") ? tag.slice(1) : tag;
    });
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    //checar todos os valores
    if (formError) return;
    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);

    //redirect home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit__post}>
      {post && (
        <>
          <h2>Editando post</h2>
          <p>Altere os dados do seu post :)</p>
          <div className={styles.wrap_form__post}>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título:</span>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Pense num bom título..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>URL da imagem:</span>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Insira uma imagem bonita"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </label>
              <p className={styles.preview__title}>Preview da imagem atual:</p>
              <img
                className={styles.image_preview}
                src={post.image}
                alt={post.title}
              />
              <label>
                <span>Conteúdo:</span>
                <textarea
                  type="text"
                  name="body"
                  required
                  placeholder="Insira seu conhecimento"
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                ></textarea>
              </label>
              <label>
                <span>Hashtags:</span>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Insira as # separadas por vírgula"
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </label>

              {!response.loading && <button className="btn">Cadastrar</button>}
              {response.loading && (
                <button className="btn" disabled>
                  Aguarde...
                </button>
              )}
              {response.error && <p className="error">{response.error}</p>}
              {formError && <p className="error">{formError}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditPost;
