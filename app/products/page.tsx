import React from "react";
import Card from "@/components/Card";
import styles from "@/styles//products/products.module.scss";
import colza from "@/assets/prod.jpg";
import acacia from "@/assets/acacia.png";
import mixed from "@/assets/mixed.png";
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
          <Card
            title="Akác méz"
            value={4000}
            src={acacia}
            path="/products/acacia"
          />
          <Card
            title="Repce Méz"
            value={3500}
            src={oosColza}
            path="/products/colza"
          />
          <Card
            title="Vegyes méz"
            value={3000}
            src={mixed}
            path="/products/mixed"
          />
        </div>
      </div>
    </>
  );
};

export default Products;
