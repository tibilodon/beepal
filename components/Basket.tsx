import React from "react";
import styles from "@/styles/basket.module.scss";
import icon from "@/assets/emptyCart.svg";
import Image from "next/image";


interface BasketProps {
  quantity: number;
  amount: number;
}

const Basket: React.FC<BasketProps> = ({ quantity, amount }) => {
  return (
    <>
      <button className={styles.wrap}>
        <Image alt="cart icon" src={icon} />

        {quantity >= 1 ? (
          <p className={styles.quantity}>{quantity}</p>
        ) : (
          <p>Kosár</p>
        )}
        {amount > 1 && <p className={styles.amount}>{amount} Ft</p>}
      </button>
    </>
  );
};

export default Basket;
