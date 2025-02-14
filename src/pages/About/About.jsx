//css
import styles from "./About.module.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Fire <span>Blog</span>
        <p>
          Este projeto consiste em um blog feito em react no front-end e
          firebase no backend.
        </p>
        <Link to="/posts/create" className="btn">
          Criar Post
        </Link>
      </h2>
    </div>
  );
};

export default About;
