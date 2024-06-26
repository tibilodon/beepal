import { useEffect, useState } from "react";
import ProductCard from "../../Components/cards/productCard/ProductCard";
import { useAppProvider } from "../../Context/AppContext";

import styles from "./products.module.css";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import Loader from "../../Components/Loader/Loader";
import Login from "../Account/public/Login";
import { ScrollRestoration } from "react-router-dom";
function ProductsHome() {
  const { products } = useAppProvider();
  const [honeyProducts, setHoneyProducts] = useState<ProductDetail[]>();
  const [otherProducts, setOtherProducts] = useState<ProductDetail[]>();
  useEffect(() => {
    const honeys = products.filter((hon) => hon.category === 1);
    setHoneyProducts(honeys);

    const otherProds = products.filter((p) => p.category === 2);
    setOtherProducts(otherProds);
  }, [products]);

  if (!products) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <section className={styles.products}>
          <h1>Mézek</h1>
          {honeyProducts &&
            honeyProducts.map((item) => {
              return (
                <div key={item.id}>
                  <ProductCard product={item} />
                </div>
              );
            })}
        </section>
        <hr />
        <section className={styles.products}>
          <h1>Méhészeti termékek</h1>
          {otherProducts &&
            otherProducts.map((item) => {
              return (
                <div key={item.id}>
                  <ProductCard product={item} />
                </div>
              );
            })}
        </section>
      </div>
      <ScrollRestoration />
      <Login />
    </>
  );
}

export default ProductsHome;
