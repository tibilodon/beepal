"use client";
import Button from "@/components/Button";

import styles from "@/styles/select.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export const dynamic = "force-dynamic";

const Select: React.FC<any> = () => {
  const amount = 10;
  //amount to array
  let valArr: any = [];
  for (let index = 1; index <= amount; index++) {
    valArr.push(index);
  }

  const [selectedValue, setSelectedValue] = useState(1);
  const handleChange = (e: any): void => {
    setSelectedValue(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = () => {
    setCookie("acacia", selectedValue);
    // window.location.reload();
    router.refresh();
  };

  return (
    <div className={styles.wrap}>
      <select onChange={handleChange} value={selectedValue} name="" id="">
        {valArr &&
          valArr.map((val, index) => {
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
