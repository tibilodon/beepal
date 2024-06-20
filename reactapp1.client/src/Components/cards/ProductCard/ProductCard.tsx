import { useEffect, useState } from "react";
import {
  ProductDetail,
  ProductDetailDto,
} from "../../../Helpers/Types/commonTypes";
import styles from "./productCard.module.css";
import ButtonA from "../../buttons/ButtonA";
import { initialCartItem } from "../../../Helpers/initialDatas/initialData";
import SelectPackaging from "../../form/select/SelectPackaging";

interface Props {
  product: ProductDetail;
}

function ProductCard({ product }: Props) {
  useEffect(() => {
    const data = { ...product, placedInCartQuantity: 0 };
    setCartItems(data);
  }, [product]);

  const [cartItems, setCartItems] = useState<ProductDetailDto>(initialCartItem);

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setCartItems((prevVals: ProductDetailDto) => ({
      ...prevVals,
      placedInCartQuantity: prevVals.placedInCartQuantity + 1,
    }));
  }

  return (
    <>
      {cartItems && (
        <div className={styles.wrap}>
          <img src={cartItems.imageUrl} />
          <section className={styles.details}>
            <span className={styles.productName}>{cartItems.name}</span>
            <span>{cartItems.price * cartItems.packaging} Ft</span>
            <SelectPackaging
              id="packaging"
              value={cartItems.packaging}
              setValue={setCartItems}
            />
          </section>
          <ButtonA
            onClick={(e) => handleAddToCart(e)}
            label="Kosárba"
            color="basic"
          />
        </div>
      )}
    </>
  );
}

export default ProductCard;
