import styles from "./cartItemCard.module.css";
import { Link } from "react-router-dom";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import { ConvertPackaging } from "../../../Helpers/utils/utils";
import WhiteSpace from "../../utils/WhiteSpace";
import { useAppProvider } from "../../../Context/AppContext";
interface Props {
  product: ProductDetailDto;
}

function PlainCartItemCard({ product }: Props) {
  const { resetShowStates } = useAppProvider();
  const { name, packaging, placedInCartQuantity, price, imageUrl, id } =
    product;

  return (
    <>
      <div className={`${styles.wrap} ${styles.plainWrap}`}>
        <Link to={`/product/${id}`} onClick={resetShowStates}>
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
            </div>
          </div>
        </Link>
        <span className={styles.valueDetails}>
          <p>{placedInCartQuantity}</p>
          <WhiteSpace />
          <p>x</p>
          <WhiteSpace />
          <p>{packaging * price} Ft</p>
        </span>
      </div>
    </>
  );
}

export default PlainCartItemCard;
