import styles from "./home.module.css";
import image from "../../assets/images/home-image.jpg";
import ButtonA from "../../Components/buttons/ButtonA";

function Home() {
    return (
        <>
            <div className={styles.wrap}>
                <img className={styles.image} src={image}></img>
                <section className={styles.heroSection}>
                   
                        <h1 className={styles.heroHeader}>
                            Kiváló minőségű méz az alföld szívéből.
                        </h1>
                        <h4 >Kínálatunkban megtalálja a legfinomabb mézeket, propoliszt és méhviasz termékeket, melyeket hagyományos módszerekkel készítünk.</h4>
                 
                </section>
                    <span className={styles.btn}>
                        <ButtonA label="Vásárlás" />
                    </span>
            </div>
        </>
    );

}

export default Home;