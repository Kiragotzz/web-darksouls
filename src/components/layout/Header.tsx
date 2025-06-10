"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/user", label: "Usuário" },
  ];

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navContainer}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:underline ${
                  pathname === item.path ? "font-bold underline" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
