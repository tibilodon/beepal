import styles from "./cartPageCard.module.css";
import { Link } from "react-router-dom";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import close from "../../../assets/icons/close.svg";
import { ConvertPackaging } from "../../../Helpers/utils/utils";
import WhiteSpace from "../../utils/WhiteSpace";
import { DeleteCookie } from "../../../Helpers/dataAccessors/cookieFetcher";
import { useAppProvider } from "../../../Context/AppContext";
import CounterSelect from "../../form/select/CounterSelect/CounterSelect";
import { useState } from "react";
// import SelectAmount from "../../form/select/SelectAmount";
interface Props {
  product: ProductDetailDto;
}

function CartPageCard({ product }: Props) {
  const { checkCartItems, resetShowStates } = useAppProvider();

  const [currentProduct, setCurrentProduct] =
    useState<ProductDetailDto>(product);
  const { name, packaging, placedInCartQuantity, price, imageUrl, id } =
    currentProduct;

  async function handleDelete() {
    const result = await DeleteCookie(id, packaging);
    if (result) {
      await checkCartItems();
    }
  }

  return (
    <>
      <div className={styles.wrap}>
        <Link to={`/product/${id}`} onClick={resetShowStates}>
          <img
            onClick={handleDelete}
            className={styles.deleteIcon}
            src={close}
          ></img>
          <div className={styles.content}>
            <img src={imageUrl} />
            <div className={styles.details}>
              <span>
                <p>
                  {name}
                  <WhiteSpace />
                  -
                  <WhiteSpace />
                </p>
                <p>{ConvertPackaging(packaging)}</p>
              </span>
              <span>
                <p>{placedInCartQuantity}</p>
                <WhiteSpace />
                <p>x</p>
                <WhiteSpace />
                <p>{packaging * price} Ft</p>
              </span>
            </div>
          </div>
        </Link>
        <CounterSelect state={currentProduct} setState={setCurrentProduct} />
      </div>
    </>
  );
}

export default CartPageCard;
