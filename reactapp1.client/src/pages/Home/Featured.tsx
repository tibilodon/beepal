import Slider from "../../Components/slider/Slider";
import { useAppProvider } from "../../Context/AppContext";

function Featured() {
  const { products } = useAppProvider();
  return (
    <>
      <Slider data={products} />
    </>
  );
}
export default Featured;
