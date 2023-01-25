"use client";
import styles from "@/styles/wrap.module.scss";

import { usePathname } from "next/navigation";

interface WrapProps {
  children: any;
  checkPath: string;
}
const Wrap: React.FC<WrapProps> = ({ children, checkPath }) => {
  const pathName = usePathname();

  const activeClass = (path: string): any => {
    let res;
    pathName === path ? (res = styles.active) : (res = null);
    return res;
  };
  return <div className={activeClass(checkPath)}>{children}</div>;
};

export default Wrap;