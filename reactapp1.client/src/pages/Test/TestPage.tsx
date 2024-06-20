import SliderV from "../../Components/slider/Slider";
import { useAppProvider } from "../../Context/AppContext";
import styles from "./testPage.module.css";

function TestPage() {
  const { products } = useAppProvider();
  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          height: "500px",
          margin: "0 auto",
        }}
      >
        <SliderV data={products} />
      </div>
    </>
  );
}

export default TestPage;
