import { useEffect, useState } from "react";
import {
  ProductDetail,
  ProductDetailDto,
} from "../../../Helpers/Types/commonTypes";
import styles from "./productCard.module.css";
import ButtonA from "../../buttons/ButtonA";
import { initialProductDetailDto } from "../../../Helpers/initialDatas/initialData";
import SelectPackaging from "../../form/select/SelectPackaging";
import { AddItemToCart } from "../../../Helpers/dataAccessors/cookieFetcher";
import { useAppProvider } from "../../../Context/AppContext";
import { Link } from "react-router-dom";

interface Props {
  product: ProductDetail;
}

function ProductCard({ product }: Props) {
  const { checkCartItems, setShowCartSidebar } = useAppProvider();
  useEffect(() => {
    const data = { ...product, placedInCartQuantity: 0 };
    setCartItems(data);
  }, [product]);

  const [cartItems, setCartItems] = useState<ProductDetailDto>(
    initialProductDetailDto
  );

  async function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const data: ProductDetailDto = { ...cartItems, placedInCartQuantity: 1 };

    setCartItems(data);
    const result = await AddItemToCart(data);
    if (result) {
      //  refresh value
      await checkCartItems();
      setShowCartSidebar(true);
    }
  }

  return (
    <>
      {cartItems && (
        <div className={styles.wrap}>
          <Link to={`/product/${cartItems.id}`}>
            <img src={cartItems.imageUrl} />
          </Link>
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
// function checkCartItems() {
//   throw new Error("Function not implemented.");
// }
