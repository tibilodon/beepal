import Button from "@/components/Button";
import styles from "@/styles/nav.module.scss";
import DropdownButton from "@/components/dropdown/DropdownButton";
import Link from "next/link";
import ActiveClassWrap from "@/components/wraps/ActiveClassWrap";

const Navbar: React.FC<any> = () => {
  return (
    <nav className={styles.wrap}>
      <div className={styles.buttonWrap}>
        <ActiveClassWrap checkPath={"/products"}>
          <DropdownButton />
        </ActiveClassWrap>
        <Link href={"/about"}>
          <ActiveClassWrap checkPath="/about">
            <Button text="Rólunk" />
          </ActiveClassWrap>
        </Link>
        <Link href={"/blog"}>
          <ActiveClassWrap checkPath="/blog">
            <Button text="Blog" />
          </ActiveClassWrap>
        </Link>
        <Link href={"/contact"}>
          <ActiveClassWrap checkPath="/contact">
            <Button text="Kapcsolat" />
          </ActiveClassWrap>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
