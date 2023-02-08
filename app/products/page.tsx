import React from "react";
import Card from "@/components/Card";
import styles from "@/styles//products/products.module.scss";
import prod1 from "@/assets/prod.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod from "@/assets/acacia.png";
import test from "@/assets/test.png";
import oosColza from "@/assets/oosColza.jpg";

interface ProductsProps {
  props: any;
}

const Products: React.FC<ProductsProps> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Termékek</h1>

        <div className={styles.content}>
          {/* <div> */}
          <Card
            title="Akác méz"
            value={3000}
            src={prod}
            path="/products/acacia"
          />
          {/* </div>
        <div> */}
          <Card
            title="Repce Méz"
            value={3500}
            src={oosColza}
            path="/products/colza"
          />
          {/* </div>
        <div> */}
          <Card
            title="Vegyes méz"
            value={3000}
            src={test}
            path="/products/mixed"
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Products;
