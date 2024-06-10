import styles from "./cartSidebar.module.css";
import { useAppProvider } from "../../../Context/AppContext";
import close from "../../../assets/icons/close.svg";
import {
  GetCartItems,
  AddItemToCart,
} from "../../../Helpers/dataAccessors/cookieFetcher";
import {
  Category,
  Packaging,
  ProductDetailDto,
} from "../../../Helpers/Types/commonTypes";

function CartSidebar() {
  const { showCartSidebar, setShowCartSidebar, checkCartItems } =
    useAppProvider();

  const fixValue: ProductDetailDto = {
    Id: "",
    Category: Category.Honey,
    Description: "some desc",
    ImageUrl: "",
    Name: "test name",
    Packaging: Packaging.Regular,
    PlacedInCartQuantity: 1,
    Price: 100,
    Stock: 3,
  };

  const handleAdd = () => {
    AddItemToCart(fixValue);
  };

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
