import styles from "./product.module.css";
import { useEffect, useState } from "react";
import { useAppProvider } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import SelectPackaging from "../../form/select/SelectPackaging";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import { initialProductDetailDto } from "../../../Helpers/initialDatas/initialData";
import SelectAmount from "../../form/select/SelectAmount";
import ButtonA from "../../buttons/ButtonA";
import { AddItemToCart } from "../../../Helpers/dataAccessors/cookieFetcher";

//TODO: add more content
function Product() {
  const { id } = useParams();
  const { products, checkCartItems, setShowCartSidebar } = useAppProvider();
  const [product, setProduct] = useState<ProductDetailDto>(
    initialProductDetailDto
  );
  useEffect(() => {
    const findProduct = products.find((p) => p.id === id);
    if (findProduct) {
      const data = { ...findProduct, placedInCartQuantity: 0 };
      setProduct(data!);
    }
  }, [id, products]);

  if (!product) {
    return <Loader />;
  }

  async function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const result = await AddItemToCart(product);
    if (result) {
      //  refresh value
      await checkCartItems();
      setShowCartSidebar(true);
    }
  }

  return (
    <>
      {
        <div className={styles.wrap}>
          <section className={styles.image}>
            <img src={product.imageUrl} />
          </section>
          <section className={styles.details}>
            <h1>{product.name}</h1>
            <span>{product.price * product.packaging} Ft</span>
            <SelectPackaging
              value={product.packaging}
              setValue={setProduct}
              id="packaging"
            />
            <SelectAmount
              id="placedInCartQuantity"
              value={product.stock}
              setValue={setProduct}
            />
            <ButtonA
              label="Kosárba"
              color="success"
              onClick={handleAddToCart}
            />
            <p>{product.description}</p>
          </section>
        </div>
      }
    </>
  );
}

export default Product;
