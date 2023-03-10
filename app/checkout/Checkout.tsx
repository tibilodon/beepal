import Clearer from "./Clearer";
import { cookies } from "next/headers";
import styles from "@/styles/checkoutProducts.module.scss";
import Image from "next/image";
//images
import acaciaImg from "@/assets/acacia.png";
import mixedImg from "@/assets/mixed.png";
import colzaImg from "@/assets/prod.jpg";
import AmountSelect from "@/components/AmountSelect";
import Form from "./Form";

const Checkout: React.FC<any> = () => {
  const nextCookies = cookies();

  const acacia: any = nextCookies.get("acacia") || 0;
  const colza: any = nextCookies.get("colza") || 0;
  const mixed: any = nextCookies.get("mixed") || 0;
  return (
    <>
      <div className={styles.fullWrap}>
        <h1 className={styles.h1}>Kosár</h1>
        <div className={styles.wrap}>
          <div className={styles.content}>
            {acacia ? (
              <>
                <div className={styles.item}>
                  <div className={styles.product}>
                    <h2>Akác Méz</h2>
                    <Image
                      className={styles.img}
                      alt="a jar of acacia honey"
                      src={acaciaImg}
                    />
                  </div>
                  <AmountSelect
                    name="acacia"
                    amount={Number(acacia.value)}
                    value={4000}
                  />
                  <Clearer cookieName="acacia" />
                </div>
              </>
            ) : null}
            {mixed ? (
              <>
                <div className={styles.item}>
                  <div className={styles.product}>
                    <h2>Vegyes méz</h2>
                    <Image
                      className={styles.img}
                      alt="a jar of mixed honey"
                      src={mixedImg}
                    />
                  </div>
                  <AmountSelect
                    name="mixed"
                    amount={Number(mixed.value)}
                    value={3000}
                  />
                  <Clearer cookieName="mixed" />
                </div>
              </>
            ) : null}{" "}
            {colza ? (
              <>
                <div className={styles.item}>
                  <div className={styles.product}>
                    <h2>Repce Méz</h2>
                    <Image
                      className={styles.img}
                      alt="a jar of colza honey"
                      src={colzaImg}
                    />
                  </div>
                  {/*  */}
                  <AmountSelect
                    name="colza"
                    amount={Number(colza.value)}
                    value={3500}
                  />
                  <Clearer cookieName="colza" />
                </div>
              </>
            ) : null}
            {!acacia && !colza && !mixed && <h1>Üres</h1>}
          </div>

          {!acacia && !colza && !mixed ? null : (
            <div className={styles.formWrap}>
              <Form
                acacia={acacia ? acacia : null}
                mixed={mixed ? mixed : null}
                colza={colza ? colza : null}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
