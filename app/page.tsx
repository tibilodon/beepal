import React from "react";
import CookieFooter from "./CookieFooter";

interface HomeProps {
  props: any;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <h1>Home</h1>
      <CookieFooter />
    </>
  );
};

export default Home;
