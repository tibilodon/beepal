// "use client";
import Button from "@/components/Button";
import styles from "@/styles/nav.module.scss";
// import Basket from "@/components/Basket";
import DropdownButton from "@/components/dropdown/DropdownButton";
import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
import ActiveClassWrap from "@/components/wraps/ActiveClassWrap";

// export const dynamic = "force-dynamic";

const Navbar: React.FC<any> = () => {
  // const pathName = usePathname();
  // const router = useRouter();
  // const refreshData = () => {
  //   router.refresh();
  // };

  // const activeClass = (path: string): any => {
  //   let res;
  //   pathName === path ? (res = styles.active) : (res = null);
  //   return res;
  // };

  return (
    <nav className={styles.wrap}>
      <div className={styles.buttonWrap}>
        <ActiveClassWrap checkPath={"/products"}>
          <DropdownButton />
        </ActiveClassWrap>
        {/* <div className={activeClass("/products")}> */}
        {/* </div> */}
        <Link href={"/about"}>
          {/* <div className={activeClass("/about")}> */}
          <ActiveClassWrap checkPath="/about">
            <Button text="Rólunk" />
          </ActiveClassWrap>
          {/* </div> */}
        </Link>
        <Link href={"/blog"}>
          <ActiveClassWrap checkPath="/blog">
            <Button text="Blog" />
          </ActiveClassWrap>
          {/* <div className={activeClass("/blog")}> */}
          {/* </div> */}
        </Link>
        <Link href={"/contact"}>
          <ActiveClassWrap checkPath="/contact">
            <Button text="Kapcsolat" />
          </ActiveClassWrap>
          {/* <div className={activeClass("/contact")}> */}
          {/* </div> */}
        </Link>
      </div>
      {/* <div className={styles.basket}>
        <Link href={"/checkout"}>
          <div className={activeClass("/checkout")}></div>
        </Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
