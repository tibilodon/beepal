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
  const taste = "Klasszikus lágyság, a nektárok igazi íze";
  const benefits = "Immunerősítő, allergia ellen";
  const description = `A vegyes virágméz a tavasz igazi ajándéka. A növények egyidőben kezdenek virágozni, így a méhek minden fajtából gyűjtenek. Fogyasztása elősegítheti allergiás panaszok enyhítését, és az immunrendszer erősítését.
    Kristályosodásra közepesen hajlamos mézfajta.`;
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
