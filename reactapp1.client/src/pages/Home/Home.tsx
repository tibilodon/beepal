import styles from "./home.module.css";
import image from "../../assets/images/home-image.jpg";
import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";
import { useEffect } from "react";

function Home() {
  const { showRegister } = useAppProvider();

  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return { errors: "", products: result.products };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { errors: "Failed to fetch products", products: null };
    }
  };
  return (
    <>
      <div className={styles.wrap}>
        <img className={styles.image} src={image}></img>
        <section className={styles.heroSection}>
          <h1 className={styles.heroHeader}>
            Kiváló minőségű méz az alföld szívéből.
          </h1>
          <h4>
            Kínálatunkban megtalálja a legfinomabb mézeket, propoliszt és
            méhviasz termékeket, melyeket hagyományos módszerekkel készítünk.
          </h4>
        </section>
        <span className={styles.btn}>
          <ButtonA label="Vásárlás" onClick={() => console.log(showRegister)} />
        </span>
      </div>
    </>
  );
}

export default Home;
