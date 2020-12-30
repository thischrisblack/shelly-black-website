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
                    <div className={styles.name}>
                        <Link href={{ pathname: '/' }}>
                            <a>Shelly Black</a>
                        </Link>
                    </div>
                    <div className={styles.navSection} ref={libraryNav}>
                        Library &amp; Archival Work
                        <ul onClick={() => setOpen(false)}>
                            <li>
                                <Link href={{ pathname: '/about' }}>
                                    <a>About</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={{ pathname: '/cv' }}>
                                    <a>CV</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={{ pathname: '/portfolio' }}>
                                    <a>Portfolio</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={{ pathname: '/library-blog' }}>
                                    <a>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navSection} ref={photoNav}>
                        Photography
                        <ul onClick={() => setOpen(false)}>
                            <li>
                                <Link href={{ pathname: '/gallery' }}>
                                    <a>Gallery</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={{ pathname: '/exhibits' }}>
                                    <a>Exhibits</a>
                                </Link>
                            </li>
                            <li>
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
