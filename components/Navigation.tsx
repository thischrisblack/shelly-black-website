import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.scss';
import ColorBar from './ColorBar';

export default function Navigation() {
    const [isOpen, setOpen] = useState(false);

    const photoNav = useRef(null);
    const libraryNav = useRef(null);

    // Open/close nav items.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1050) {
            photoNav.current.style.display = isOpen ? 'block' : 'none';
            libraryNav.current.style.display = isOpen ? 'block' : 'none';
        }
    });

    return (
        <>
            <header>
                <nav className={styles.nav}>
                    <div
                        className={`${styles.name} ${styles.navLink} ${styles.homeLink}`}
                    >
                        <Link href={{ pathname: '/' }}>
                            <a>
                                <h1>Shelly Black</h1>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.navSection} ref={libraryNav}>
                        <h3>Library &amp; Archival Work</h3>
                        <ul onClick={() => setOpen(false)}>
                            <li className={`${styles.navLink} ${styles.about}`}>
                                <Link href={{ pathname: '/about' }}>
                                    <a>About</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.cv}`}>
                                <Link href={{ pathname: '/cv' }}>
                                    <a>CV</a>
                                </Link>
                            </li>
                            <li
                                className={`${styles.navLink} ${styles.portfolio}`}
                            >
                                <Link href={{ pathname: '/portfolio' }}>
                                    <a>Portfolio</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.blog}`}>
                                <Link href={{ pathname: '/library-blog' }}>
                                    <a>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navSection} ref={photoNav}>
                        <h3>Photography</h3>
                        <ul onClick={() => setOpen(false)}>
                            <li
                                className={`${styles.navLink} ${styles.gallery}`}
                            >
                                <Link href={{ pathname: '/gallery' }}>
                                    <a>Gallery</a>
                                </Link>
                            </li>
                            <li
                                className={`${styles.navLink} ${styles.exhibits}`}
                            >
                                <Link href={{ pathname: '/exhibits' }}>
                                    <a>Exhibits</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.blog}`}>
                                <Link href={{ pathname: '/photography-blog' }}>
                                    <a>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.burger}>
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>
                <ColorBar />
            </header>
        </>
    );
}
