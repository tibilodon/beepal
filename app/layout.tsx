import "./globals.css";
import Header from "./Header";
import styles from "@/styles/header.module.scss";
import { Inter_Tight } from "@next/font/google";
import CookieFooter from "./CookieFooter";
import { cookies } from "next/headers";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter_Tight({
  subsets: ["cyrillic"],
  weight: "400",
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //check tnc cookie
  const nextCookies = cookies();
  const cookie = nextCookies.get("tncCookie");
  return (
    <html className={inter.className} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <h1 className={styles.mobileProt}>
          Az oldal fejlesztés alatt. Használatához (jelenleg), minimum 905*650px
          felbontású készülék szükséges.
        </h1>
        <div className={styles.mobile}> */}
        <div className={styles.fixed}>
          <Header />
        </div>

        <div className={styles.container}>
          {children}
          {cookie?.value ? null : <CookieFooter />}
        </div>
        {/* </div> */}
      </body>
    </html>
  );
}
