import SliderV from "../../Components/slider/Slider";
import { useAppProvider } from "../../Context/AppContext";
import styles from "./home.module.css";

function Featured() {
  const { products } = useAppProvider();
  return (
    <>
      <section className={styles.sliderWrap}>
        <SliderV data={products} />
      </section>
    </>
  );
}
export default Featured;
