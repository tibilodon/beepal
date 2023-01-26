import React from "react";
import ProductItemWrap from "@/components/wraps/ProductItemWrap";
import img from "@/assets/mixed.png";

const Mixed: React.FC<any> = () => {
  const selectName = "mixed";
  const productName = "Vegyes Méz";
  const productPrice = "3000 Ft / kg";
  const taste = "Kellemesen krémes, sejmes íz a repce enyhe savasságával";
  const benefits = "Immunerősítő, gyomorbántalmakra különösen pozitív hatású";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quaerat, eaque voluptate error vitae corporis culpa quod impedit voluptatibus recusandae neque sunt illum. Adipisci, commodi nobis debitis animi voluptate tenetur.";
  return (
    <>
      <ProductItemWrap
        img={img}
        selectName={selectName}
        benefits={benefits}
        description={description}
        productName={productName}
        productPrice={productPrice}
        taste={taste}
      />
    </>
  );
};

export default Mixed;
