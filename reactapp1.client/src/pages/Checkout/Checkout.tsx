import { useAppProvider } from "../../Context/AppContext";
import styles from "./checkout.module.css";
import logo from "../../assets/images/logo.png";
import cart from "../../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import Input from "../../Components/form/input/Input";
import { useEffect, useState } from "react";
import ExpandCartItems from "../../Components/cart/expandCartItems/ExpandCartItems";
import {
  initialAddressDto,
  initialCustomer,
  initialOrderData,
  // initialProductDetailDto,
} from "../../Helpers/initialDatas/initialData";
import {
  AddressDto,
  Customer,
  OrderData,
  // ProductDetailDto,
} from "../../Helpers/Types/commonTypes";
import Divider from "../../Components/utils/Divider";
import ButtonA from "../../Components/buttons/ButtonA";

function Checkout() {
  //  TODO: add shipping fee
  const shippingFee: number = 3000;
  const { cartItems, totalAmount, cartCounter } = useAppProvider();
  const [expand, setExpand] = useState<boolean>(false);
  // const [formData, setFormData] = useState<OrderData>(initialOrderData);
  const [customerData, setCustomerData] = useState<Customer>(initialCustomer);
  const [addressData, setAddressData] = useState<AddressDto>(initialAddressDto);

  //  no need to resubmit product data. will be consumed by the backend via cookies

  const handleCustomerData = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.currentTarget;

    setCustomerData((prevVals) => ({
      ...prevVals,
      [id]: value,
      //  turn value into enum value
      // [id]: id === "category" || id === "packaging" ? Number(value) : value,
    }));
  };

  const handleAddressData = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.currentTarget;

    setAddressData((prevVals) => ({
      ...prevVals,
      //  turn value into enum value
      [id]: id === "zipCode" ? Number(value) : value,
    }));
  };

  async function handleSubmit() {
    //  check for empty values
  }

  return (
    <>
      <div className={styles.wrap}>
        <section>
          <div
            className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.padding}`}
          >
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo icon" />
            </Link>
            <Link to="/cart">
              <img className={styles.cartIcon} src={cart} alt="cart icon" />
            </Link>
          </div>

          <div className={`${styles.flewCol} ${styles.lighterBackground}`}>
            <ExpandCartItems
              expand={expand}
              setExpand={setExpand}
              products={cartItems}
              totalAmount={totalAmount}
            />
          </div>
        </section>
        <form className={styles.form}>
          <div className={styles.contactDetails}>
            {/*TODO: add login*/}
            <h1>Kapcsolattartási adatok</h1>
            <Input
              type="email"
              value={customerData.email}
              id="email"
              onChangeHandler={handleCustomerData}
              placeholder="e-mail"
            />
          </div>
          <Divider />

          <section className={styles.flexCol}>
            <h3>Szállítási mód</h3>
            <Input
              type="text"
              value={customerData.firstName}
              id="firstName"
              onChangeHandler={handleCustomerData}
              placeholder="Keresztnév"
            />
            <Input
              type="text"
              value={customerData.lastName}
              id="lastName"
              onChangeHandler={handleCustomerData}
              placeholder="Vezetéknév"
            />
            <Input
              type="number"
              value={addressData.zipCode}
              id="zipCode"
              onChangeHandler={handleAddressData}
              placeholder="Irányítószám"
            />
            <Input
              type="text"
              value={addressData.city}
              id="city"
              onChangeHandler={handleAddressData}
              placeholder="Település"
            />
            <Input
              type="text"
              value={addressData.address}
              id="address"
              onChangeHandler={handleAddressData}
              placeholder="Cím"
            />
            <Input
              type="text"
              value={addressData.additionalDetails}
              id="additionalDetails"
              onChangeHandler={handleAddressData}
              placeholder="Épület, emelet, ajtó, stb. (nem kötelező)"
            />
            <Input
              type="phone"
              value={customerData.phone}
              id="phone"
              onChangeHandler={handleCustomerData}
              placeholder="Telefonszám"
            />
          </section>

          <section className={styles.flexCol}>
            <ExpandCartItems
              expand={expand}
              setExpand={setExpand}
              products={cartItems}
              totalAmount={totalAmount}
            />
            <span className={styles.flexRow}>
              <p>Részösszeg</p>
              <p>{totalAmount} Ft</p>
            </span>
            <span className={styles.flexRow}>
              <p>Szállítás</p>
              <p>3000 Ft</p>
            </span>
            <span className={styles.flexRow}>
              <p>Végösszeg:</p>
              <p>{totalAmount + shippingFee} Ft</p>
            </span>
            <ButtonA label="Rendelés" color="basic" />
          </section>
        </form>
        <Divider />

        <section className={`${styles.footer} ${styles.padding}`}>
          <p>Visszatérítési szabályzat</p>
          <p>Szállítási szabályzat</p>
          <p>Adatvédelmi szabályzat</p>
          <p>Szolgáltatási feltételek</p>
          <p>Jogi közlemény</p>
          <p>Kapcsolattartási adatok</p>
        </section>
      </div>
    </>
  );
}
export default Checkout;
