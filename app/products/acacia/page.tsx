import React from "react";
import styles from "@/styles/products/item.module.scss";
import Image from "next/image";
import img from "@/assets/acacia.png";
import tasteIcon from "@/assets/taste.svg";
import benefitsIcon from "@/assets/benefits.svg";
import test from "@/assets/benefits2.png";
import Select from "@/components/Select";

const Acacia: React.FC<any> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Image alt="jar of acacia honey" src={img} priority />
        </div>
        <div className={styles.item}>
          <div>
            <h4>3000 Ft / kg</h4>
            <h1>Akác méz</h1>
          </div>
          <div className={styles.icon}>
            <div>
              <Image alt="taste icon" src={tasteIcon} />
              <h5>Kellemes, tavaszi érzést keltő ízélmény</h5>
            </div>
            {/* <div>
              <Image alt="benefits icon" src={benefitsIcon} />
              <h5>Torokfájás és légúti megbetegedések enyhítésére</h5>
            </div> */}
            <div>
              <Image alt="test icon" src={test} />
              <h5>keep or delete icon here</h5>
            </div>
          </div>
          <p>
            Az akácméz világos és tiszta színű, amely az akácvirágzás gyümölcse.
            Különös odafigyelés és előkészület gondoskodik arról, hogy a
            kitermelés során az akácméz nem keveredik más virágok nektárjával.
            Könnyed, édes és finom virágos íze az egyik legnépszerűbb mézfajta.
            Állaga folyékony (nem kristályosodik), amely a magas
            fruktóztartalmának köszönhető. Alacsony savasságának köszönhetően
            kiválóan édesít úgy, hogy az étel vagy ital aromája és íze nem
            változik.
          </p>
          <div className={styles.cart}>
            <Select />
          </div>
        </div>
      </div>
    </>
  );
};

export default Acacia;
