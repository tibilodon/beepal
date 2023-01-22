import React from "react";
import Card from "@/components/Card";
import styles from "@/styles/products.module.scss";

interface ProductsProps {
  props: any;
}

const Products: React.FC<ProductsProps> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Products</h1>
        <div>
          <Card path="/acacia"></Card>
          <Card path="/colza"></Card>
          <Card path="/mixed"></Card>
        </div>
      </div>
    </>
  );
};

export default Products;
