import React from "react";
import ProductItemWrap from "@/components/wraps/ProductItemWrap";
import img from "@/assets/mixed.png";
import { cookies } from "next/headers";

const Mixed: React.FC<any> = () => {
  const nextCookies = cookies();

  const mixed: any = nextCookies.get("mixed");
  let mixedValue: number = 0;
  if (mixed) {
    mixedValue = Number(mixed.value);
  }
  const selectName = "mixed";
  const productName = "Vegyes Méz";
  const productPrice = "3000 Ft / kg";
  const taste = "Klasszikus, lágyság a nyári nektárok igazi íze";
  const benefits = "Immunerősítő, gyomorbántalmakra különösen pozitív hatású";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quaerat, eaque voluptate error vitae corporis culpa quod impedit voluptatibus recusandae neque sunt illum. Adipisci, commodi nobis debitis animi voluptate tenetur.";
  return (
    <>
      <ProductItemWrap
        img={img}
        selectName={selectName}
        selectCookieProp={mixedValue}
        benefits={benefits}
        description={description}
        productName={productName}
        productPrice={productPrice}
        taste={taste}
        stockAmount={30}
      />
    </>
  );
};

export default Mixed;
