import React from "react";
import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/card.module.scss";
import Image from "next/image";

interface CardProps {
  path: string;
  src: any;
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ path, src, title, value }) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Link href={path}>
            <Image alt="jar of honey" src={src} />
          </Link>
        </div>

        <div className={styles.item}>
          <h1>{title}</h1>
          <h2>{value} Ft / kg</h2>
          <Link href={path}>
            <Button text="Bővebben" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
