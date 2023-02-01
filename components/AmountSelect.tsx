"use client";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import upIcon from "@/assets/arrowUp.svg";
import downIcon from "@/assets/arrowDown.svg";
import styles from "@/styles/amountSelect.module.scss";
import { previewData } from "next/headers";

interface AmountSelectProps {
  amount: number;
  value: number;
  name: string;
}

const AmountSelect: React.FC<AmountSelectProps> = ({ amount, value, name }) => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(amount || 0);
  const [selectedValue, setSelectedValue] = useState(value || 0);
  const addHandler = () => {
    setSelectedAmount(selectedAmount + 1);
  };
  const removeHandler = () => {
    setSelectedAmount(selectedAmount - 1);
  };
  // const onClickHandler = () => {
  //   setCookie("acacia", 5);
  //   router.refresh();
  // };

  return (
    <>
      <div className={styles.wrap}>
        <h4>Mennyiség (db): </h4>
        <div className={styles.content}>
          <div onClick={addHandler}>
            <Image alt="Keyboard Arrow Up" src={upIcon} />
          </div>
          <span>{selectedAmount}</span>
          <div onClick={removeHandler}>
            <Image alt="Keyboard Arrow Down" src={downIcon} />
          </div>
        </div>
        <h4>Total value: {selectedAmount * selectedValue}</h4>
        {/* <button onClick={onClickHandler}>test acacia set to 2</button> */}
      </div>
    </>
  );
};

export default AmountSelect;