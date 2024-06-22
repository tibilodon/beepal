import styles from "./cartItemCard.module.css";
import { Link } from "react-router-dom";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import close from "../../../assets/icons/close.svg";
import { ConvertPackaging } from "../../../Helpers/utils/utils";
import WhiteSpace from "../../utils/WhiteSpace";
import { DeleteCookie } from "../../../Helpers/dataAccessors/cookieFetcher";
import { useAppProvider } from "../../../Context/AppContext";
interface Props {
  product: ProductDetailDto;
}

function CartItemCard({ product }: Props) {
  const { checkCartItems } = useAppProvider();
  const { name, packaging, placedInCartQuantity, price, imageUrl, id } =
    product;

  async function handleDelete() {
    const result = await DeleteCookie(id, packaging);
    if (result) {
      await checkCartItems();
    }
  }

  return (
    <>
      <div className={styles.wrap}>
        <Link to={`/product/${id}`}>
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
        <img
          onClick={handleDelete}
          className={styles.deleteIcon}
          src={close}
        ></img>
      </div>
    </>
  );
}

export default CartItemCard;
