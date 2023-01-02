import React from "react";
import Image from "next/image";
import instagram from "/public/instagram.svg";

import facebook from "/public/facebook.svg";

import youtube from "/public/youtube.svg";
import s2hLogo from "/public/logo2.svg";

import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles["main"]}>
      <div className={styles["container"]}>
        <div className={styles["left"]}>
          <ul>
            {/* `&lsquo;`, `&#39;`, */}
            <li>SHOES2HAND&#39;s WEBSITE</li>
            <li>CONTACT US:</li>
            <li>Phone: +84 808 333 333</li>
            <li>Address: 227 Nguyen Van Cu, District 5, HCMC</li>
            <li> Email: shoes2handproject@gmail.com</li>
          </ul>
        </div>
        <div className={styles["center"]}>
          <ul>
            <li>
              <Image
                src={instagram}
                alt="instagram"
                className={styles["logo"]}
              />
              <p>Shoes2Hand</p>
            </li>
            <li>
              <Image src={facebook} alt="facebook" className={styles["logo"]} />
              <p>Shoes2Hand</p>
            </li>
            <li>
              <Image src={youtube} alt="youtube" className={styles["logo"]} />
              <p>Shoes2Hand</p>
            </li>
          </ul>
        </div>
        <div className={styles["right"]}>
          <div>
            <Link href={"/"}>
              <a className={styles["sh2_bar"]}>
                <Image
                  src={s2hLogo}
                  alt="Logo"
                  className={styles["s2h_logo"]}
                  width={64}
                  height={64}
                />
                <h3>Shoes2hand</h3>
              </a>
            </Link>
            <p>
              “Since all great journeys start with a single step,
              <span>You should probably have on a cute pair of shoes”</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
