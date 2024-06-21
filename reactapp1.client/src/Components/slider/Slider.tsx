import styles from "./slider.module.css";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import ButtonA from "../buttons/ButtonA";
import { useEffect, useState } from "react";
import ProductCard from "../cards/productCard/ProductCard";

type Props = {
  data: ProductDetail[];
};

function SliderV({ data }: Props) {
  const [productIndex, setProductIndex] = useState(0);
  const [freeze, setFreeze] = useState(false);

  useEffect(() => {
    const value = productIndex + 1;
    if (!freeze) {
      const intervalId = setInterval(() => {
        if (data && productIndex !== data.length - 1) {
          if (data[value].imageUrl.length) {
            setProductIndex(value);
          }
        } else {
          setProductIndex(0);
        }
      }, 3000);
      //  clean up the interval when the component unmounts or when a dependency changes
      return () => clearInterval(intervalId);
    }
  }); //  adjust dependencies as needed

  function prevHandler() {
    setProductIndex((index) => {
      if (index === 0) {
        return data.length - 1;
      }
      return index - 1;
    });
  }

  function nextHandler() {
    setProductIndex((index) => {
      if (index === data.length - 1) {
        return 0;
      }
      return index + 1;
    });
  }

  return (
    <>
      <section aria-label="Product card Slider" className={styles.wrap}>
        <div className={styles.content}>
          {data.map((p, index) => (
            <span
              onClick={() => setFreeze(true)}
              key={index}
              aria-hidden={productIndex !== index}
              className={styles.cardSlider}
              style={{ translate: `${-100 * productIndex}%` }}
            >
              <ProductCard product={p} />
            </span>
          ))}
        </div>
        <div className={styles.buttons}>
          <ButtonA
            label="<"
            color="success"
            // disabled={isDisabled}
            onClick={prevHandler}
          />
          <ButtonA
            label=">"
            color="success"
            // disabled={isDisabled}
            onClick={nextHandler}
          />
        </div>
      </section>
    </>
  );
}
export default SliderV;
