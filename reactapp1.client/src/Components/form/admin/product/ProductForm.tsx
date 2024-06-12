import { ProductDetail } from "../../../../Helpers/Types/commonTypes";
import ButtonA from "../../../buttons/ButtonA";
import Input from "../../input/Input";
import ExpandableTextfield from "../../textfield/ExpandableTextfield";
import styles from "./productForm.module.css";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: ProductDetail;
  setFormData: React.Dispatch<React.SetStateAction<ProductDetail>>;
  onChangeHandler: (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

function ProductForm({
  handleSubmit,
  formData,
  setFormData,
  onChangeHandler,
}: Props) {
  return (
    <>
      <form className={styles.wrap} onSubmit={handleSubmit}>
        {/* <Input
          value={formData.description}
          id="description"
          placeholder="description"
          type="text"
          onChangeHandler={onChangeHandler}
        />{" "} */}
        <ExpandableTextfield
          formData={formData}
          setFormData={setFormData}
          formField="description"
          placeHolder="description"
        />
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
    </>
  );
}

export default ProductForm;
