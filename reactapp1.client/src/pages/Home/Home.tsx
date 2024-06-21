import styles from "./home.module.css";
import image from "../../assets/images/home-image.jpg";
import ButtonA from "../../Components/buttons/ButtonA";
import Featured from "./Featured";
import { Link, ScrollRestoration } from "react-router-dom";

function Home() {
  return (
    <>
      <div className={styles.all}>
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
            <Link to={"/products"}>
              <ButtonA label="Vásárlás" />
            </Link>
          </span>
        </div>

        <Featured />
        <ScrollRestoration />
      </div>
    </>
  );
}

export default Home;
