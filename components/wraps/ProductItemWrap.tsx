import React from "react";
import styles from "@/styles/wraps/productItemWrap.module.scss";
import Image from "next/image";
import tasteIcon from "@/assets/taste.svg";
import benefitsIcon from "@/assets/benefits2.png";
import Select from "../Select";

interface ProductItemWrapProps {
  img: any;
  selectName: string;
  productName: string;
  productPrice: string;
  taste: string;
  benefits: string;
  description: string;
}

const ProductItemWrap: React.FC<ProductItemWrapProps> = ({
  img,
  selectName,
  productName,
  productPrice,
  taste,
  benefits,
  description,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Image alt="product image" src={img} />
        </div>
        <div className={styles.item}>
          <div>
            <h1>{productName}</h1>
            <h4>{productPrice}</h4>
          </div>
          <div className={styles.icon}>
            <div className={styles.taste}>
              <Image alt="taste icon" src={tasteIcon} />
              <h5>{taste}</h5>
            </div>
            <div className={styles.benefits}>
              <Image alt="benefits icon" src={benefitsIcon} />
              <h5>{benefits}</h5>
            </div>
          </div>
          <p>{description}</p>
          <Select name={selectName} />
        </div>
      </div>
    </>
  );
};

export default ProductItemWrap;