"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/form.module.scss";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import Input from "@/components/Input";
import Button from "@/components/Button";
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
  email: string;
  address: {
    postCode: number;
    street: string;
    city: string;
  };
  orderNo: number;
}

const Form: React.FC<FormProps> = ({ acacia, mixed, colza }) => {
  // const orderNo: number = Math.floor(Math.random() * 100);
  // console.log(orderNo);
  // const [set, setSet] = useState("");
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState<Form>({
    acaciaVal: acacia,
    mixedVal: mixed,
    colzaVal: colza,
    name: "",
    tel: "",
    email: "",
    address: {
      postCode: 0,
      street: "",
      city: "",
    },
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
    setIsDisabled(true);
  };
  // console.log(+form.acaciaVal?.value > 1 && "rr");
  return (
    <>
      <div className={styles.wrap}>
        <h3>Megrendelő adatai</h3>
        <form
          action="https://formsubmit.co/tibilodondev@gmail.com"
          method="POST"
          className={styles.content}
          onSubmit={handleSubmit}
        >
          {/*TODO: for email alert*/}
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value={`New order: ${form.orderNo}`}
          />
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
          {/* <input
            onChange={e => setForm({ ...form, name: e.currentTarget.value })}
            type="text"
            name="name"
            placeholder="név"
            required
          /> */}
          <Input
            name="name"
            onChange={e => setForm({ ...form, name: e.currentTarget.value })}
            placeholder="név"
            type="text"
          />
          {/* <input
            onChange={e => setForm({ ...form, tel: e.currentTarget.value })}
            type="tel"
            placeholder="telefonszám"
            required
          /> */}
          <Input
            name="phone"
            onChange={e => setForm({ ...form, tel: e.currentTarget.value })}
            placeholder="telefonszám"
            type="tel"
          />
          {/* <input
            onChange={e => setForm({ ...form, email: e.currentTarget.value })}
            type="email"
            name="email"
            placeholder="e-mail cím"
            required
          />{" "} */}
          <Input
            name="email"
            onChange={e => setForm({ ...form, email: e.currentTarget.value })}
            placeholder="e-mail cím"
            type="email"
          />
          {/* <input
            onChange={e => setForm({ ...form, address: e.currentTarget.value })}
            type="text"
            name="address"
            placeholder="szállítási cím"
            required
          /> */}
          <div className={styles.item}>
            <h4>Cím</h4>
            <Input
              name="postCode"
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, postCode: e.currentTarget.value },
                })
              }
              placeholder="irányítószám"
              type="number"
            />{" "}
            <Input
              name="street"
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, street: e.currentTarget.value },
                })
              }
              placeholder="utca, házszám"
              type="text"
            />{" "}
            <Input
              name="city"
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.currentTarget.value },
                })
              }
              placeholder="település"
              type="text"
            />
          </div>
          <Button
            text="Rendelés"
            onClick={() =>
              setForm({ ...form, orderNo: Math.floor(Math.random() * 1000) })
            }
            type="submit"
          />
          {/* <button
            disabled={isDisabled}
            onClick={() =>
              setForm({ ...form, orderNo: Math.floor(Math.random() * 1000) })
            }
            type="submit"
          >
            Rendelés
          </button> */}
        </form>
      </div>
    </>
  );
};

export default Form;
