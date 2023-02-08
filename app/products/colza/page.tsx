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
  const description = `A frissen pergetett repce méz: halványsárga színű, enyhe zamatú, édes illatú méz. Erősen hajlamos kristályosodásra, ilyenkor kifehéredik és nagyon finom szemcsés állagot kap. A kristályosodás gyorsasága függ a hőmérséklettől, illetve a szűréshez felmelegített repce, sokkal nehezebben kristályosodik vissza. Lúgos kémhatása miatt a legalkalmasabb méhészeti termék a gyomorproblémákkal küzdők körében.
Kísérletek bizonyítják, hogy a repceméz magas szőlőcukortartalma serkenti a gondolkodást, javítja a memóriát, segíti az információk rögzülését, vagyis a tanulást.`;
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
