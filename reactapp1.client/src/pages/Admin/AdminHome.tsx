import styles from "./adminHome.module.css";
import { useEffect, useState } from "react";
import {
  GetAllProducts,
  AddProduct,
} from "../../Helpers/dataAccessors/adminFetcher";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import { initialProductDetails } from "../../Helpers/initialDatas/initialData";
import Input from "../../Components/form/input/Input";
import ButtonA from "../../Components/buttons/ButtonA";
function AdminHome() {
  const [products, setProducts] = useState<ProductDetail[]>();
  const [formData, setFormData] = useState<ProductDetail>(
    initialProductDetails
  );

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.currentTarget;

    setFormData((prevVals: ProductDetail) => ({
      ...prevVals,
      //  turn value into enum value
      [id]: id === "category" || id === "packaging" ? Number(value) : value,
    }));
  };

  async function GetData() {
    const result: ProductDetail[] = await GetAllProducts();
    console.log("thy result", result);
    setProducts(result);
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <h1>welcome admin</h1>
        <h1 className="danger">Your products</h1>
        {products &&
          products.map((item, index) => {
            return (
              <div className={styles.wrap} key={index}>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.packaging}</p>
              </div>
            );
          })}
      </div>

      <div className={styles.wrap}>
        <h1>ADD PRODUCT</h1>
        <form onSubmit={(e) => AddProduct(e, formData)}>
          <Input
            value={formData.description}
            id="description"
            placeholder="description"
            type="text"
            onChangeHandler={onChangeHandler}
          />{" "}
          <Input
            value={formData.imageUrl}
            id="imageUrl"
            placeholder="imageUrl"
            type="text"
            onChangeHandler={onChangeHandler}
          />
          <Input
            value={formData.name}
            id="name"
            placeholder="name"
            type="text"
            onChangeHandler={onChangeHandler}
          />
          <Input
            value={formData.price}
            id="price"
            placeholder="price"
            type="text"
            onChangeHandler={onChangeHandler}
          />
          <Input
            value={formData.stock}
            id="stock"
            placeholder="stock"
            type="text"
            onChangeHandler={onChangeHandler}
          />
          <select
            value={formData.category}
            id="category"
            onChange={onChangeHandler}
          >
            <option value={1}>Méz</option>
            <option value={2}>Méhészeti termékek</option>
          </select>
          <ButtonA label="Save" color="success" type="submit" />
        </form>
      </div>
    </>
  );
}

export default AdminHome;
