import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import styles from './Navigation.module.scss';
import ColorBar from './ColorBar';

export default function Navigation() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <header>
                <nav className={styles.nav}>
                    <div className={styles.name}>
                        <Link href={{ pathname: '/' }}>
                            <a>Shelly Black</a>
                        </Link>
                    </div>
                    <div className={styles.navSection}>
                        Library &amp; Archive Work
                        <ul>
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
                    <div className={styles.navSection}>
                        Photography
                        <ul>
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
                                <Link href={{ pathname: '/photo-blog' }}>
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
