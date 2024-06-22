import styles from "./products.module.css";
import { useEffect, useState } from "react";
import { useAppProvider } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import SelectPackaging from "../../Components/form/select/SelectPackaging";
import { ProductDetailDto } from "../../Helpers/Types/commonTypes";
import { initialProductDetailDto } from "../../Helpers/initialDatas/initialData";
import SelectAmount from "../../Components/form/select/SelectAmount";
import ButtonA from "../../Components/buttons/ButtonA";
import { AddItemToCart } from "../../Helpers/dataAccessors/cookieFetcher";

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
        <div className={styles.productWrap}>
          <section className={styles.image}>
            <img src={product.imageUrl} />
            <div className={styles.test}>
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
            </div>
          </section>
          <section className={styles.details}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </section>
        </div>
      }
    </>
  );
}

export default Product;
