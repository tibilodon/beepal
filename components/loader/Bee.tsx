import styles from "./bee.module.scss";
import bee from "./bee.png";

const Bee = () => {
  return (
    <>
      <div className={styles.beeWrap}>
        <div className={styles.character}>
          <img className={styles.characterSpriteSheet} src={bee} alt="bee" />
        </div>
      </div>
    </>
  );
};

export default Bee;
