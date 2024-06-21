import { useEffect, useState } from "react";
import ProductCard from "../../Components/cards/ProductCard/ProductCard";
import { useAppProvider } from "../../Context/AppContext";

import styles from "./products.module.css";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import Loader from "../../Components/Loader/Loader";
import Login from "../Account/public/Login";
import { Link, ScrollRestoration } from "react-router-dom";
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
        <h1>Mézek</h1>
        {honeyProducts &&
          honeyProducts.map((item) => {
            return (
              <section key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <ProductCard product={item} />
                </Link>
              </section>
            );
          })}
        <hr />
        <h1>Méhészeti termékek</h1>
        {otherProducts &&
          otherProducts.map((item) => {
            return (
              <section key={item.id}>
                <ProductCard product={item} />
              </section>
            );
          })}
      </div>
      <ScrollRestoration />
      <Login />
    </>
  );
}

export default ProductsHome;
