import { useAppProvider } from "../../Context/AppContext";
import styles from "./products.module.css";
function ProductsHome() {
    const { products} = useAppProvider();
  return (
    <p>Hello world!</p>
  );
}

export default ProductsHome;