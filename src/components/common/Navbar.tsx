"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DecryptedText from "@/components/DecryptedText";
import style from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "https://medium.com/@ieeecs" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },


  ];

  return (
    <nav className={`${style.navbar} ${scrolled ? style.fixed : ""}`}>
      <div className={style["nav-container"]}>
        <div className={style.logo}>
          ieee
          <br />
          computer society<span> muj</span>
        </div>

        <div
          className={`${style.hamburger} ${menuOpen ? style.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${style["nav-menu"]} ${menuOpen ? style.open : ""}`}>
          {navItems.map((item) => (
            <li
              key={item.href}
              className={pathname === item.href ? style.active : ""}
            >
              <Link href={item.href}>
                <DecryptedText
                  text={item.name}
                  speed={70}
                  maxIterations={9}
                  className={style["nav-text"]}
                  encryptedClassName={style["nav-encrypted"]}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}