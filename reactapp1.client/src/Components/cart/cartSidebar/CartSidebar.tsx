import styles from "./cartSidebar.module.css";
import { useAppProvider } from "../../../Context/AppContext";
import close from "../../../assets/icons/close.svg";
import {
  GetCartItems,
  AddItemToCart,
} from "../../../Helpers/dataAccessors/cookieFetcher";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
import Loader from "../../Loader/Loader";

function CartSidebar() {
  const {
    showCartSidebar,
    setShowCartSidebar,
    checkCartItems,
    products,
    isLoading,
  } = useAppProvider();

  const handleAdd = async () => {
    //  loading state change would disturb UX
    const data: ProductDetailDto = { ...products[0], placedInCartQuantity: 1 };
    const result = await AddItemToCart(data);
    if (result) {
      //  refresh value
      await checkCartItems();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={styles.sideNav}
        style={{ width: `${showCartSidebar ? "300px" : "0"}` }}
      >
        <button
          onClick={() => setShowCartSidebar(!showCartSidebar)}
          className={styles.closebtn}
        >
          <img className={styles.navIcon} src={close}></img>
        </button>
        <section className={styles.navLinks}>
          <p onClick={GetCartItems}>get cookies</p>
          <p onClick={handleAdd}>set fix value</p>
          <p onClick={checkCartItems}>refresh</p>
        </section>
      </div>
    </>
  );
}

export default CartSidebar;
