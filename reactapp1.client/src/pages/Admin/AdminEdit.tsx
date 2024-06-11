import styles from "./admin.module.css";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import { useParams, useNavigate } from "react-router-dom";
import { useAppProvider } from "../../Context/AppContext";
import { useState } from "react";
import { UpdateProduct } from "../../Helpers/dataAccessors/adminFetcher";
import Input from "../../Components/form/input/Input";
import ButtonA from "../../Components/buttons/ButtonA";

function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, setProducts } = useAppProvider();
  const product = products.find((p) => p.id === id);
  const [formData, setFormData] = useState<ProductDetail>(product!);

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
    const result = await UpdateProduct(formData);
    setProducts(result);
    navigate("/admin");
  };

  return (
    <>
      <div className={styles.wrap}>
        <h1>Adminedit admin</h1>
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
      </div>
    </>
  );
}

export default AdminEdit;
