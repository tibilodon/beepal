import React from "react";
import styles from "@/styles/products/item.module.scss";
import Image from "next/image";
import img from "@/assets/acacia.png";

const Acacia: React.FC<any> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Image alt="jar of acacia honey" src={img} priority />
        </div>
        <div className={styles.item}>
          <h1>acacia</h1>
          <p>
            Az akácméz világos és tiszta színű, amely az akácvirágzás gyümölcse.
            Különös odafigyelés és előkészület gondoskodik arról, hogy a
            kitermelés során az akácméz nem keveredik más virágok nektárjával.
            Könnyed, édes és finom virágos íze az egyik legnépszerűbb mézfajta.
            Állaga folyékony (nem kristályosodik), amely a magas
            fruktóztartalmának köszönhető. Alacsony savasságának köszönhetően
            kiválóan édesíd úgy, hogy az aroma és az íz nem változik.
          </p>
        </div>
      </div>
    </>
  );
};

export default Acacia;
