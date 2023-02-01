"use client";
import Button from "@/components/Button";

import styles from "@/styles/select.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export const dynamic = "force-dynamic";

interface SelectProps {
  name: string;
  amount: number;
  cookieProp: number;
  strict: any;
}

const Select: React.FC<SelectProps> = ({ name, amount, cookieProp }) => {
  let valArr: any = [];
  for (let index = 1; index <= amount; index++) {
    valArr.push(index);
  }

  const [selectedValue, setSelectedValue] = useState(1);
  const handleChange = (e: any): void => {
    setSelectedValue(Number(e.currentTarget.value));
  };

  const router = useRouter();

  const handleSubmit = () => {
    let res = selectedValue + cookieProp;
    setCookie(name, res);
    setSelectedValue(1);
    router.refresh();
  };

  return (
    <div className={styles.wrap}>
      <select onChange={handleChange} value={selectedValue}>
        {valArr &&
          valArr.map((val: any, index: number) => {
            return (
              <option value={val} key={index}>
                {val}
              </option>
            );
          })}
      </select>
      <Button text="Kosárba" onClick={handleSubmit} />
    </div>
  );
};

export default Select;
