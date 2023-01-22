import styles from "./bee.module.scss";
import bee from "./bee.png";
import Image from "next/image";

const Bee: React.FC<any> = () => {
  return (
    <>
      <div className={styles.beeWrap}>
        <div className={styles.character}>
          <Image
            alt="bee sprite"
            src={bee}
            className={styles.characterSpriteSheet}
          />
        </div>
      </div>
    </>
  );
};

export default Bee;
