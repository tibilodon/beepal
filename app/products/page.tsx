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
        <h1>Products</h1>
        <div>
          <Card src={prod1} path="/acacia"></Card>
          <Card src={prod2} path="/colza"></Card>
          <Card src={prod3} path="/mixed"></Card>
        </div>
      </div>
    </>
  );
};

export default Products;
