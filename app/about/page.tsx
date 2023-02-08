import React from "react";
import Image from "next/image";
import img from "@/assets/aboutImg.jpg";
import styles from "@/styles/about.module.scss";
import logo from "@/assets/beepalogo5.png";

const About = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <h1>Rólunk</h1>
        <p>
          "A <span>Hingyi Méhészet</span> egy hobbinak indult. A méhek
          együttműködése és annak gyümölcse azonban mára már több embert is
          képes ellátni mint a tulajdonost és családját, barátait. 2021-ben
          Méhészmesterré váltam, így az eddig is első helyen álló, fenntartható
          fejlődés még nagyobb tudatossággal segíthető. Minden "pergetés" előtt
          figyelembe vesszük az időjárást és az adott évszakot, ezzel is
          minimalizálva a méhek terhelését."
          <br />
          <h5> Hingyi Pál, a Hingyi Méhészet tulajdonosa</h5>
        </p>
        <Image
          alt="picture of a beekeeper surrounded by hives"
          src={img}
          className={styles.img}
          priority
        />
      </div>
      <Image priority className={styles.logo} alt="logo" src={logo} />
    </div>
  );
};

export default About;
