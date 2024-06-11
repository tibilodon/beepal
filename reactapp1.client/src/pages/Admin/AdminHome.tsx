import styles from "./admin.module.css";
import { useState } from "react";
import {
  AddProduct,
  DeleteProduct,
} from "../../Helpers/dataAccessors/adminFetcher";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import { initialProductDetails } from "../../Helpers/initialDatas/initialData";
import Input from "../../Components/form/input/Input";
import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
function AdminHome() {
  const navigate = useNavigate();
  const { products, setProducts } = useAppProvider();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await AddProduct(formData);
    setProducts(result);
    setFormData(initialProductDetails);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const result = await DeleteProduct(id);
    setProducts(result);
    setFormData(initialProductDetails);
  };

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
                <ButtonA
                  label="Update"
                  color="success"
                  onClick={() => navigate(`edit/${item.id}`)}
                />
                <ButtonA
                  label="Delete"
                  color="danger"
                  onClick={(e) => handleDelete(e, item.id!)}
                />
              </div>
            );
          })}
      </div>

      <div className={styles.wrap}>
        <h1>ADD PRODUCT</h1>
        <form onSubmit={handleSubmit}>
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
          <select
            value={formData.packaging}
            id="packaging"
            onChange={onChangeHandler}
          >
            <option value={1}>250g</option>
            <option value={2}>500g</option>
            <option value={3}>750g</option>
          </select>
          <ButtonA label="Save" color="success" type="submit" />
        </form>
      </div>
    </>
  );
}

export default AdminHome;
