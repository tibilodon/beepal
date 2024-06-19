import styles from "./slider.module.css";
import { useEffect, useState } from "react";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import ProductCard from "../cards/ProductCard/ProductCard";
import ButtonA from "../buttons/ButtonA";

type Props = {
  data: ProductDetail[];
};

function Slider({ data }: Props) {
  const [freeze, setFreeze] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [highlightData, setHighlightData] = useState(data[0]);

  //TODO:set next | prev btn disabled for the duration of the animation or 1s

  // create function for local scope variable
  const localValue = (): number => {
    return data.indexOf(highlightData);
  };
  useEffect(() => {
    const value = localValue() + 1;
    console.log(value);
    if (!freeze) {
      const intervalId = setInterval(() => {
        if (data && localValue() !== data.length - 1) {
          if (data[value].imageUrl.length) {
            setHighlightData(data[value]);
          }
        } else {
          setHighlightData(data[0]);
        }
      }, 3000);
      //  clean up the interval when the component unmounts or when a dependency changes
      return () => clearInterval(intervalId);
    }
  }); //  adjust dependencies as needed

  const nextHandler = () => {
    setFreeze(true);
    // if (!isDisabled) {
    //   setIsDisabled(true);
    // }

    const value = localValue() + 1;
    if (data && localValue() !== data.length - 1) {
      setHighlightData(data[value]);
    } else {
      setHighlightData(data[0]);
    }
  };

  const prevHandler = () => {
    setFreeze(true);
    // if (!isDisabled) {
    //   setIsDisabled(true);
    // }

    const value = localValue() - 1;
    if (data && localValue() !== 0) {
      setHighlightData(data[value]);
    } else {
      //  loop
      setHighlightData(data[data.length - 1]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  }, [isDisabled]);

  return (
    <>
      {highlightData && (
        <div className={styles.wrap}>
          <section onClick={() => setFreeze(true)}>
            <ProductCard product={highlightData} />
          </section>
          <div className={styles.buttons}>
            <ButtonA
              label="<"
              color="success"
              disabled={isDisabled}
              onClick={prevHandler}
            />
            <ButtonA
              label=">"
              color="success"
              disabled={isDisabled}
              onClick={nextHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
