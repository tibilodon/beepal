import styles from "./home.module.css";
import image from "../../assets/images/home-image.jpg";
import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";

function Home() {
    const { showRegister } = useAppProvider();

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
                    <ButtonA label="Vásárlás" onClick={ ()=>console.log(showRegister)} />
                    </span>
            </div>
        </>
    );

}

export default Home;