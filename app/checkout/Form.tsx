"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/form.module.scss";
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
  const [finalValue, setFinalValue] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
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
  }, [acacia, mixed, colza, form.orderNo]);

  useEffect(() => {
    const quantitySetter = () => {
      let acaciaVal = acacia ? acacia.value : 0;
      let mixedVal = mixed ? mixed.value : 0;
      let colzaVal = colza ? colza.value : 0;
      setFinalValue(
        Number(acaciaVal * 4000) +
          Number(mixedVal * 3000) +
          Number(colzaVal * 3500)
      );
    };
    quantitySetter();
  }, [acacia, mixed, colza]);

  console.log(finalValue);
  const handleSubmit = () => {
    console.log("SUBMITTED AS:", form);
    deleteCookie("acacia");
    deleteCookie("mixed");
    deleteCookie("colza");
    setIsDisabled(true);
  };
  return (
    <>
      <div className={styles.wrap}>
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
          <div className={styles.item}>
            <h3>Megrendelő adatai</h3>
            <div className={styles.personal}>
              <Input
                name="name"
                onChange={e =>
                  setForm({ ...form, name: e.currentTarget.value })
                }
                placeholder="név"
                type="text"
              />
              <Input
                name="phone"
                onChange={e => setForm({ ...form, tel: e.currentTarget.value })}
                placeholder="telefonszám"
                type="tel"
              />
              <Input
                name="email"
                onChange={e =>
                  setForm({ ...form, email: e.currentTarget.value })
                }
                placeholder="e-mail cím"
                type="email"
              />
            </div>
          </div>

          {/*TODO:address*/}
          <div className={styles.item}>
            <h3>Cím</h3>
            <div className={styles.post}>
              <div className={styles.postItem}>
                <Input
                  name="postCode"
                  onChange={e =>
                    setForm({
                      ...form,
                      address: {
                        ...form.address,
                        postCode: e.currentTarget.value,
                      },
                    })
                  }
                  placeholder="irányítószám"
                  type="number"
                />{" "}
              </div>
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
          </div>
          <div className={styles.price}>
            <h2>Összesen: {finalValue} Ft</h2>
            <Button
              disabled={isDisabled}
              text="Rendelés"
              onClick={() =>
                setForm({ ...form, orderNo: Math.floor(Math.random() * 1000) })
              }
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
