"use client";
import styles from "@/styles/wraps/activeClassWrap.module.scss";

import { usePathname, useRouter } from "next/navigation";

interface ActiveClassWrapProps {
  children: any;
  checkPath: string;
  // checkPaths?: boolean;
  refresh?: boolean;
  // onClick: () => void;
}
const ActiveClassWrap: React.FC<ActiveClassWrapProps> = ({
  children,
  checkPath,
  // checkPaths,
  refresh,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  // const test = "/products/acacia";
  // console.log(pathName);

  const activeClass = (path: string): any => {
    let res;
    pathName === path || pathName?.includes(path)
      ? (res = styles.active)
      : (res = null);
    return res;
  };

  const refreshHandler = () => {
    router.refresh();
  };

  return (
    <>
      <div
        //@ts-ignore
        onClick={refresh && refreshHandler}
        className={activeClass(checkPath)}
      >
        {children}
      </div>
    </>
  );
};

export default ActiveClassWrap;
