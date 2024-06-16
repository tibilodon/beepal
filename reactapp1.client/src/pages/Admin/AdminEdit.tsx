import styles from "./admin.module.css";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import { useParams, useNavigate } from "react-router-dom";
import { useAppProvider } from "../../Context/AppContext";
import { useState } from "react";
import {
  DeleteProduct,
  UpdateProduct,
} from "../../Helpers/dataAccessors/adminFetcher";
import ButtonA from "../../Components/buttons/ButtonA";
import ProductForm from "../../Components/form/admin/product/ProductForm";

function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, setProducts } = useAppProvider();
  const product = products.find((p) => p.id === id);
  console.log("the product:", product);

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
    console.log("is getting submitted!!:_", formData);
    const result = await UpdateProduct(formData);
    setProducts(result);
    navigate("/admin");
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const result = await DeleteProduct(id);
    setProducts(result);
    // setFormData(initialProductDetails);
  };

  return (
    <>
      <div className={styles.wrap}>
        <h1>Adminedit admin</h1>
        <div className={styles.wrap}>
          <h1>Edit PRODUCT</h1>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            onChangeHandler={onChangeHandler}
          />
          <ButtonA
            label="Delete"
            color="danger"
            onClick={(e) => handleDelete(e, id!)}
          />
        </div>
      </div>
    </>
  );
}

export default AdminEdit;
