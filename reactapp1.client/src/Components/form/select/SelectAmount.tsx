import styles from "./selectPackaging.module.css";
import { Dispatch, SetStateAction } from "react";
import { ProductDetailDto } from "../../../Helpers/Types/commonTypes";
interface Props {
  id: string;

  value: number;
  setValue: Dispatch<SetStateAction<ProductDetailDto>>;
}
function SelectAmount({ id, value, setValue }: Props) {
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
    <>
      <select
        name={id}
        className={styles.select}
        id={id}
        onChange={onChangeHandler}
      >
        <optgroup label="Mennyiség">
          {Array.from({ length: value }, (_, i) => i + 1).map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </optgroup>
      </select>
    </>
  );
}
export default SelectAmount;
