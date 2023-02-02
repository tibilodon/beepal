"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/form.module.scss";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
interface FormProps {
  acacia: object;
  mixed: object;
  colza: object;
}

const Form: React.FC<FormProps> = ({ acacia, mixed, colza }) => {
  // const orderNo: number = Math.floor(Math.random() * 100);
  // console.log(orderNo);
  // const [set, setSet] = useState("");
  const router = useRouter();
  const [form, setForm] = useState({
    acaciaVal: acacia,
    mixedVal: mixed,
    colzaVal: colza,
    name: "",
    tel: "",
    address: "",
    orderNo: 0,
  });
  useEffect(() => {
    setForm({
      ...form,
      acaciaVal: acacia,
      mixedVal: mixed,
      colzaVal: colza,
    });
    setCookie("orderNo", form.orderNo);
    // console.log("TEST", test);
  }, [acacia, mixed, colza, form.orderNo]);
  // console.log("TEST", form);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("SUBMITTED AS:", form);
    // console.log("LOOK AT THIS:", set);
    router.push("/done");
  };

  return (
    <>
      <div>
        <h3>form</h3>

        <form className={styles.wrap} onSubmit={handleSubmit}>
          <input
            onChange={e => setForm({ ...form, name: e.currentTarget.value })}
            type="text"
            placeholder="név"
          />
          <input
            onChange={e => setForm({ ...form, tel: e.currentTarget.value })}
            type="tel"
            placeholder="telefonszám"
          />
          <input
            onChange={e => setForm({ ...form, address: e.currentTarget.value })}
            type="text"
            placeholder="cím"
          />
          {/* <Link href={"/done"}> */}
          <button
            onClick={() =>
              setForm({ ...form, orderNo: Math.floor(Math.random() * 100) })
            }
            type="submit"
          >
            Rendelés
          </button>
          {/* </Link> */}
        </form>
      </div>
    </>
  );
};

export default Form;
