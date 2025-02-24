import styles from "./CreatePost.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/UseInsertDocument";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

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
    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
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
    </div>
  );
};

export default CreatePost;
