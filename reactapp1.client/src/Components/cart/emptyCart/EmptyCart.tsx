import styles from "./emptyCart.module.css";
import icon from "../../../assets/icons/empty_cart.svg";
import ButtonA from "../../buttons/ButtonA";
import { useAppProvider } from "../../../Context/AppContext";
function EmptyCart() {
  const { resetShowStates } = useAppProvider();

  function handleCLick() {
    resetShowStates();
    //  TODO: improve UX, navigate to somewhere etc.
  }
  return (
    <>
      <section className={styles.wrap}>
        <img src={icon} />
        <p>Nincsenek termékek a kosaradban</p>
        <ButtonA
          label="Vásárlás folytatása"
          color="basic"
          onClick={handleCLick}
        />
      </section>
    </>
  );
}

export default EmptyCart;
