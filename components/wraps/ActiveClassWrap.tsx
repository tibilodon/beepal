"use client";
import styles from "@/styles/wraps/activeClassWrap.module.scss";

import { usePathname, useRouter } from "next/navigation";

interface ActiveClassWrapProps {
  children: any;
  checkPath: string;
  refresh?: boolean;
}
const ActiveClassWrap: React.FC<ActiveClassWrapProps> = ({
  children,
  checkPath,
  refresh,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  const activeClass = (path: string): any => {
    let res;
    pathName === path || pathName?.includes(path)
      ? (res = styles.active)
      : (res = null);
    return res;
  };

  const refreshHandler: any = (): void => {
    router.refresh();
  };

  return (
    <>
      <div
        onClick={refresh && refreshHandler}
        className={activeClass(checkPath)}
      >
        {children}
      </div>
    </>
  );
};

export default ActiveClassWrap;
