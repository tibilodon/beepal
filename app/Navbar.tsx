"use client";
import Button from "@/components/Button";
import styles from "@/styles/nav.module.scss";
import Basket from "@/components/Basket";
import DropdownButton from "@/components/dropdown/DropdownButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const refreshData = () => {
    router.refresh();
  };

  const activeClass = (path: string): any => {
    let res;
    pathName === path ? (res = styles.active) : (res = null);
    return res;
  };

  return (
    <nav className={styles.wrap}>
      <div className={styles.buttonWrap}>
        <div className={activeClass("/products")}>
          <DropdownButton />
        </div>
        <Link href={"/about"}>
          <div className={activeClass("/about")}>
            <Button text="Rólunk" />
          </div>
        </Link>
        <Link href={"/blog"}>
          <div className={activeClass("/blog")}>
            <Button text="Blog" />
          </div>
        </Link>
        <Link href={"/contact"}>
          <div className={activeClass("/contact")}>
            <Button text="Kapcsolat" />
          </div>
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
