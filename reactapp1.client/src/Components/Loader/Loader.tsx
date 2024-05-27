import styles from "./loader.module.css";
import image from "./bee.png";

function Loader() {
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

export default Loader;