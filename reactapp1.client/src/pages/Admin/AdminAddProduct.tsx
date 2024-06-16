import { useState } from "react";
import ProductForm from "../../Components/form/admin/product/ProductForm";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import styles from "./admin.module.css";
import { initialProductDetails } from "../../Helpers/initialDatas/initialData";
import { AddProduct } from "../../Helpers/dataAccessors/adminFetcher";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductDetail>(
    initialProductDetails
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await AddProduct(formData);
    if (result?.ok) {
      navigate("/admin");
    }
    setFormData(initialProductDetails);
  };

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
  return (
    <>
      <div className={styles.wrap}>
        <h1>ADD PRODUCT</h1>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </>
  );
}

export default AdminAddProduct;
