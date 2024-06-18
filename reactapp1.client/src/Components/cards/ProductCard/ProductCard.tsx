import { useState } from "react";
import {
  ProductDetail,
  ProductDetailDto,
} from "../../../Helpers/Types/commonTypes";
import SelectPackaging from "../../form/select/SelectPackaging";
import styles from "./productCard.module.css";
import ButtonA from "../../buttons/ButtonA";

interface Props {
  product: ProductDetail;
}

function ProductCard({ product }: Props) {
  const data = { ...product, placedInCartQuantity: 0 };
  const [cartItems, setCartItems] = useState<ProductDetailDto>(data);

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
            <span>{cartItems.name}</span>
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
