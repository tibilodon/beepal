import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./counterSelect.module.css";
import { ProductDetailDto } from "../../../../Helpers/Types/commonTypes";
import { AddItemToCart } from "../../../../Helpers/dataAccessors/cookieFetcher";
import { useAppProvider } from "../../../../Context/AppContext";

interface Props {
  state: ProductDetailDto;
  setState: Dispatch<SetStateAction<ProductDetailDto>>;
}

function CounterSelect({ state, setState }: Props) {
  const { placedInCartQuantity, stock } = state;
  const { checkCartItems } = useAppProvider();
  const [isSubtractionDisabled, setIsSubtractionDisabled] =
    useState<boolean>(false);

  const [isAdditionDisabled, setIsAdditionDisabled] = useState<boolean>(false);

  async function handleSubtraction() {
    if (placedInCartQuantity > 1) {
      const data = {
        ...state,
        placedInCartQuantity: placedInCartQuantity - 1,
      };
      // setState(data);
      const result = await AddItemToCart(data);
      if (result) {
        setState(data);

        //  refresh value
        await checkCartItems();
      }
    }
  }
  async function handleAddition() {
    if (placedInCartQuantity < stock) {
      const data = {
        ...state,
        placedInCartQuantity: placedInCartQuantity + 1,
      };
      // setState(data);
      const result = await AddItemToCart(data);

      if (result) {
        setState(data);
        //  refresh value
        await checkCartItems();
      }
    }
  }

  useEffect(() => {
    const setDisabled = () => {
      if (placedInCartQuantity === 1) {
        setIsSubtractionDisabled(true);
      } else {
        setIsSubtractionDisabled(false);
      }
      if (placedInCartQuantity === stock) {
        setIsAdditionDisabled(true);
      } else {
        setIsAdditionDisabled(false);
      }
    };
    setDisabled();
  }, [placedInCartQuantity, stock]);

  return (
    <>
      <div className={styles.wrap}>
        <button disabled={isSubtractionDisabled} onClick={handleSubtraction}>
          -
        </button>

        <p>{placedInCartQuantity}</p>
        <button disabled={isAdditionDisabled} onClick={handleAddition}>
          +
        </button>
      </div>
    </>
  );
}
export default CounterSelect;
