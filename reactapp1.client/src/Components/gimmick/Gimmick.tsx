import styles from "./gimmick.module.css";
import image from "../../assets/bee.png";

function Gimmick() {
  return (
    <>
      <div className={styles.beeWrap}>
        <div className={styles.character}>
          <img
            alt="bee sprite"
            src={image}
            className={styles.characterSpriteSheet}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Gimmick;
