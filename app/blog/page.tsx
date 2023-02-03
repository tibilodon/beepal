import React from "react";
import styles from "@/styles/blog.module.scss";
import Link from "next/link";

const Blog = () => {
  return (
    <>
      <h1 className={styles.h1}>Blog</h1>
      <div className={styles.wrap}>
        <h4>Elkészült a honlapunk! </h4>
        <p>
          Újabb fejlődés történt Méhészetünk történetében, mégpedig az itt
          látható honlap elkészülte. A termékkínálat most csak a mézeket fedi,
          az új szezonnal ezek is megújulnak. Amennyiben a rendeléssel
          valamilyen probléma merülne fel, kérjük vegye fel a kapcsolatot velünk
          <Link href={"/contact"}>
            <span className={styles.content}> itt</span>.
          </Link>
        </p>
        <span>2023/02/01</span>
      </div>
    </>
  );
};

export default Blog;
