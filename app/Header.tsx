import Navbar from "./Navbar";
import styles from "@/styles/header.module.scss";
import Image from "next/image";
import logo from "@/assets/beepalogo5.png";
import Link from "next/link";
import Basket from "@/components/Basket";
// export const dynamic = "force-dynamic";

const Header = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            priority
            className={styles.logo}
            alt="hive"
            src={logo}
          />
        </Link>
        <Navbar />
        <Basket />
      </div>
    </>
  );
};

export default Header;
