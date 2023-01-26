"use client";
import styles from "@/styles/wraps/activeClassWrap.module.scss";

import { usePathname } from "next/navigation";

interface ActiveClassWrapProps {
  children: any;
  checkPath: string;
}
const ActiveClassWrap: React.FC<ActiveClassWrapProps> = ({
  children,
  checkPath,
}) => {
  const pathName = usePathname();

  const activeClass = (path: string): any => {
    let res;
    pathName === path ? (res = styles.active) : (res = null);
    return res;
  };
  return <div className={activeClass(checkPath)}>{children}</div>;
};

export default ActiveClassWrap;
