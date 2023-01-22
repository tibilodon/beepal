import "./globals.css";
import Header from "./Header";
import styles from "@/styles/header.module.scss";
import { Inter_Tight } from "@next/font/google";

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
  return (
    <html className={inter.className} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
