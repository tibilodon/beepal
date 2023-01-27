import React from "react";
import styles from "@/styles/contact.module.scss";
import Image from "next/image";
import location from "@/assets/location.svg";
import email from "@/assets/email.svg";

const Contact = () => {
  return (
    <>
      <h1 className={styles.h1}>Kapcsolat</h1>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Image className={styles.image} alt="email icom" src={email} />
          <div className={styles.item}>
            <h2>E-mail</h2>
            <a href="mailto:hingyi90@gmail.com">
              <h4>hingyi90@gmail.com</h4>
            </a>
          </div>
        </div>
        <div className={styles.content}>
          <Image
            className={styles.image}
            alt="location home icon"
            src={location}
          />

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9244.195877820508!2d20.340501886000098!3d47.02045639649008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474151046397cbd7%3A0xfd6b1f1c40469f04!2zTWFydGbFsSwgNTQzNQ!5e0!3m2!1sen!2shu!4v1674814288006!5m2!1sen!2shu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
