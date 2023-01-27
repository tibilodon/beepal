import React from "react";
import styles from "@/styles/blog.module.scss";

const Blog = () => {
  return (
    <>
      <h1 className={styles.h1}>Blog</h1>
      <div className={styles.wrap}>
        <h4>Elkészült a honlapunk! </h4>
        <p>
          Újabb fejlődés történt Méhészetünk történetében, mégpedig az itt
          látható honlap elkészülte. A termékkínálat most csak a mézeket fedi,
          de az új szezonnal a termékeink is megújulnak. Amennyiben a
          rendeléssel valamilyen probléma merülne fel, kérjük vegye fel a
          kapcsolatot velünk itt.
        </p>
        <span>2023/02/01</span>
      </div>
    </>
  );
};

export default Blog;
