import React from "react";
import Card from "@/components/Card";
import styles from "@/styles/products.module.scss";
import prod1 from "@/assets/prod.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";

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
          <Card src={prod1} path="/products/acacia" />
          {/* </div>
        <div> */}
          <Card src={prod2} path="/products/colza" />
          {/* </div>
        <div> */}
          <Card src={prod3} path="/products/mixed" />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Products;
