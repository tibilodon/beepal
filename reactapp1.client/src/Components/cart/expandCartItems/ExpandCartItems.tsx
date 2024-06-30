import styles from "./expandCartItems.module.css";
import PlainCartItemCard from "../../cards/cartItemCard/PlainCartItemCard";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import icon from "../../../assets/icons/arrow_drop_down.svg";

interface Props {
  products: ProductDetailDto[];
  totalAmount: number;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExpandCartItems({ products, totalAmount, expand, setExpand }: Props) {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span onClick={() => setExpand(!expand)}>
            {!expand ? (
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
          className={
            expand ? `${styles.expand} ${styles.active}` : styles.expand
          }
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
