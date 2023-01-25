import styles from "@/styles/home.module.scss";
import Link from "next/link";
import Button from "@/components/Button";

interface HomeProps {
  props: any;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <h1>
            Kiváló minőségű <span>méz</span> az alföld szívéből.
          </h1>
          <h2 className={styles.h2}>A nyár ízei</h2>
          <h2>Fenntartható forrásból</h2>
          <Link href={"/products"}>
            <Button text="Vásárlás" />
          </Link>
        </div>
        {/* <CookieFooter /> */}
      </div>
    </>
  );
};

export default Home;
