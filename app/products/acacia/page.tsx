import React from "react";
import ProductItemWrap from "@/components/wraps/ProductItemWrap";
import img from "@/assets/acacia.png";

const Acacia: React.FC<any> = () => {
  const selectName = "acacia";
  const productName = "Akác Méz";
  const productPrice = "4000 Ft / kg";
  const taste = "Kellemes, tavaszi érzést keltő ízélmény";
  const benefits = "Torokfájás és légúti megbetegedések enyhítésére";
  const description = `Az akácméz világos és tiszta színű, amely az akácvirágzás gyümölcse.
            Különös odafigyelés és előkészület gondoskodik arról, hogy a
            kitermelés során az akácméz nem keveredik más virágok nektárjával.
            Könnyed, édes és finom virágos íze az egyik legnépszerűbb mézfajta.
            Állaga folyékony (nem kristályosodik), amely a magas
            fruktóztartalmának köszönhető. Alacsony savasságának köszönhetően
            kiválóan édesít úgy, hogy az étel vagy ital aromája és íze nem
            változik.`;
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
        stockAmount={20}
      />
    </>
  );
};

export default Acacia;
