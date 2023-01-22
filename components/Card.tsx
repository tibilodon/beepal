import React from "react";
import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/card.module.scss";

interface CardProps {
  path: string;
}

const Card: React.FC<CardProps> = ({ path }) => {
  return (
    <div className={styles.wrap}>
      <h1>IMAGE</h1>
      <h1>title</h1>
      <h2>value of prod</h2>
      <Link href={path}>
        <Button text="Bővebben" />
      </Link>
    </div>
  );
};

export default Card;
