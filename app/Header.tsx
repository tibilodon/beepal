import Navbar from "./Navbar";
import styles from "@/styles/header.module.scss";
import Image from "next/image";
import logo from "@/assets/beepalogo5.png";
import Link from "next/link";
import Basket from "@/components/Basket";
import ActiveClassWrap from "@/components/wraps/ActiveClassWrap";
import MobileNavbar from "./MobileNavbar";
// export const dynamic = "force-dynamic";

const Header = () => {
  // const link = Link();
  return (
    <>
      <div className={styles.wrap}>
        <MobileNavbar />

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
        {/*breaking point: 544px*/}
        <Navbar />
        <div className={styles.cart}>
          <ActiveClassWrap refresh={true} checkPath={"/checkout"}>
            <Link href={"/checkout"}>
              <Basket />
            </Link>
          </ActiveClassWrap>
        </div>
      </div>
    </>
  );
};

export default Header;
