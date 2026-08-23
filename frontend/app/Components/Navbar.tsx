// Navbar.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-opacity-75 text-light">
      <div className="container">
        <Link href="/RssFeed" passHref>
            RSS Feed
          
        </Link>
        <div className={styles.container}>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
          </div>
          <nav className={isOpen ? styles.menuOpen : styles.menu}>
            <ul>
              <li>
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Createblog" passHref>
                  Create New Blog
                </Link>
              </li>
              <li>
                <Link href="/About" passHref>
                  About
                </Link>
              </li>
              <li>
                <Link href="/Settings" passHref>
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/Dashboard" passHref>
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;