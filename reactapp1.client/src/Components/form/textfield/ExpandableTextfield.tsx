import { ProductDetail } from "../../../Helpers/Types/commonTypes";
import styles from "./expandableTextfield.module.css";
import { useEffect, useRef, useCallback } from "react";

type Props = {
  formData: ProductDetail;
  setFormData: React.Dispatch<React.SetStateAction<ProductDetail>>;
  formField: keyof ProductDetail;
  placeHolder: string;
};

function ExpandableTextfield({
  formData,
  setFormData,
  formField,
  placeHolder,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height
      textareaRef.current.style.height = "auto";
      // Set the height to fit the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData]);

  const valSetter = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setFormData({ ...formData, [formField]: value });
    },
    [formData, setFormData, formField]
  );
  return (
    <>
      <div className={styles.wrap}>
        <textarea
          ref={textareaRef}
          value={formData[formField]}
          placeholder={placeHolder}
          onChange={valSetter}
          rows={1}
          aria-label="product description"
        />
      </div>
    </>
  );
}
export default ExpandableTextfield;
