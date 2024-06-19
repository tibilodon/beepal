import { Dispatch, SetStateAction } from "react";
import styles from "./selectPackaging.module.css";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<ProductDetailDto>>;
  id: string;
}

function SelectPackaging({ value, setValue, id }: Props) {
  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.currentTarget;

    setValue((prevVals: ProductDetailDto) => ({
      ...prevVals,
      [id]: Number(value),
    }));
  };
  return (
    <select
      className={styles.wrap}
      value={value}
      id={id}
      onChange={onChangeHandler}
    >
      <optgroup label="Kiszerelés">
        <option value={1}>250g</option>
        <option value={2}>500g</option>
        <option value={3}>750g</option>
      </optgroup>
    </select>
  );
}

export default SelectPackaging;
