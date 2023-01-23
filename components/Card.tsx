import React from "react";
import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/card.module.scss";
import Image from "next/image";

interface CardProps {
  path: string;
  src: any;
}

const Card: React.FC<CardProps> = ({ path, src }) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Image alt="jar of honey" src={src} />
        </div>

        <div className={styles.item}>
          <h1>title</h1>
          <h2>value of prod</h2>
          <Link href={path}>
            <Button text="Bővebben" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
