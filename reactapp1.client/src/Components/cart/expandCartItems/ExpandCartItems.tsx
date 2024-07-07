import styles from "./expandCartItems.module.css";
import PlainCartItemCard from "../../cards/cartItemCard/PlainCartItemCard";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import icon from "../../../assets/icons/arrow_drop_down.svg";
import { useState } from "react";

interface Props {
  products: ProductDetailDto[];
  totalAmount: number;
}

function ExpandCartItems({ products, totalAmount }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span onClick={() => setOpen(!open)}>
            {!open ? (
              <p>Rendelés összegzésének megjelenítése</p>
            ) : (
              <p>Rendelés összegzésének elrejtése</p>
            )}
            <img
              className={styles.icon}
              src={icon}
              alt="arrow drop down icon"
            />
          </span>
          <p>{totalAmount} Ft</p>
        </div>

        <section
          className={open ? `${styles.expand} ${styles.active}` : styles.expand}
        >
          <span className={styles.content}>
            {products.map((items, i) => {
              return (
                <span key={items.id + i}>
                  <PlainCartItemCard product={items} />
                </span>
              );
            })}
          </span>
        </section>
      </div>
    </>
  );
}
export default ExpandCartItems;
