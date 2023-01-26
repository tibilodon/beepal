import Navbar from "./Navbar";
import styles from "@/styles/header.module.scss";
import Image from "next/image";
import logo from "@/assets/beepalogo5.png";
import Link from "next/link";
import Basket from "@/components/Basket";
import ActiveClassWrap from "@/components/wraps/ActiveClassWrap";
// export const dynamic = "force-dynamic";

const Header = () => {
  // const link = Link();
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
        <Link href={"/checkout"}>
          <div className={styles.cart}>
            <ActiveClassWrap checkPath={"/checkout"}>
              <Basket />
            </ActiveClassWrap>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Header;
