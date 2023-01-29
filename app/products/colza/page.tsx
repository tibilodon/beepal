import React from "react";
import ProductItemWrap from "@/components/wraps/ProductItemWrap";
import img from "@/assets/prod.jpg";
import { cookies } from "next/headers";

const Colza: React.FC<any> = () => {
  const nextCookies = cookies();

  const colza: any = nextCookies.get("colza");
  let colzaValue: number = 0;
  if (colza) {
    colzaValue = Number(colza.value);
  }
  const selectName = "colza";
  const productName = "Repce Méz";
  const productPrice = "3500 Ft / kg";
  const taste = "Kellemesen krémes, sejmes íz a repce enyhe savasságával";
  const benefits = "Immunerősítő, gyomorbántalmakra különösen pozitív hatású";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quaerat, eaque voluptate error vitae corporis culpa quod impedit voluptatibus recusandae neque sunt illum. Adipisci, commodi nobis debitis animi voluptate tenetur.";
  return (
    <>
      <ProductItemWrap
        img={img}
        selectName={selectName}
        selectCookieProp={colzaValue}
        benefits={benefits}
        description={description}
        productName={productName}
        productPrice={productPrice}
        taste={taste}
        stockAmount={3}
      />
    </>
  );
};

export default Colza;
