"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/form.module.scss";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
interface FormProps {
  acacia: {
    name: string;
    value: any;
  };
  mixed: {
    name: string;
    value: any;
  };
  colza: {
    name: string;
    value: any;
  };
}

interface Form {
  acaciaVal: {
    name: string;
    value: any;
  };
  mixedVal: {
    name: string;
    value: any;
  };
  colzaVal: {
    name: string;
    value: any;
  };
  name: string;
  tel: string;
  address: string;
  orderNo: number;
}

const Form: React.FC<FormProps> = ({ acacia, mixed, colza }) => {
  // const orderNo: number = Math.floor(Math.random() * 100);
  // console.log(orderNo);
  // const [set, setSet] = useState("");
  const router = useRouter();
  const [form, setForm] = useState<Form>({
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
  // console.log("TEST", form.acaciaVal.value);

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("SUBMITTED AS:", form);
    deleteCookie("acacia");
    deleteCookie("mixed");
    deleteCookie("colza");
  };

  return (
    <>
      <div>
        <h3>form</h3>

        <form
          action="https://formsubmit.co/tibilodondev@gmail.com"
          method="POST"
          className={styles.wrap}
          onSubmit={handleSubmit}
        >
          {/*TODO: for email alert*/}
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="test" />
          <input type="hidden" name="orderNumber" value={form.orderNo} />
          <input type="hidden" name="acacia" value={form.acaciaVal?.value} />
          <input type="hidden" name="mixed" value={form.mixedVal?.value} />
          <input type="hidden" name="colza" value={form.colzaVal?.value} />
          <input
            type="hidden"
            name="_next"
            value="http://localhost:3000/order"
          ></input>
          {/*TODO:*/}
          <input
            onChange={e => setForm({ ...form, name: e.currentTarget.value })}
            type="text"
            name="name"
            placeholder="név"
            required
          />
          <input
            onChange={e => setForm({ ...form, tel: e.currentTarget.value })}
            type="tel"
            placeholder="telefonszám"
            required
          />
          <input
            onChange={e => setForm({ ...form, address: e.currentTarget.value })}
            type="email"
            name="email"
            placeholder="e-mail cím"
            required
          />
          {/* <Link href={"/done"}> */}
          <button
            onClick={() =>
              setForm({ ...form, orderNo: Math.floor(Math.random() * 1000) })
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
