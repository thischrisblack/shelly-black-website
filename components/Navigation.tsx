import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.scss';
import ColorBar from './ColorBar';
import { useSelector } from 'react-redux';
import { IShopItem } from '../utils/shopping-cart';

export default function Navigation({ path }) {
    const [isOpen, setOpen] = useState(false);

    const photoNav = useRef(null);
    const libraryNav = useRef(null);
    const designNav = useRef(null);
    const cart = useSelector((state: { cart: Array<IShopItem> }) => state.cart ?? []);

    const pathParts = path.split('/');
    const location = pathParts[pathParts.length - 1];

    // Open/close nav items.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1050) {
            photoNav.current.style.display = isOpen ? 'block' : 'none';
            libraryNav.current.style.display = isOpen ? 'block' : 'none';
            if (designNav?.current != null) {
                designNav.current.style.display = isOpen ? 'block' : 'none';
            }
        }
    });

    return (
        <>
            <header>
                <nav className={styles.nav}>
                    <div className={`${styles.name} ${styles.navLink} ${styles.homeLink}`}>
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
                                    <a className={`${location === 'about' ? styles.active : ''}`}>About</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.cv}`}>
                                <Link href={{ pathname: '/cv' }}>
                                    <a className={`${location === 'cv' ? styles.active : ''}`}>CV</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.blog}`}>
                                <Link href={{ pathname: '/library-blog' }}>
                                    <a className={`${location === 'library-blog' ? styles.active : ''}`}>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navSection} ref={photoNav}>
                        <h3>Photography</h3>
                        <ul onClick={() => setOpen(false)}>
                            <li className={`${styles.navLink} ${styles.gallery}`}>
                                <Link href={{ pathname: '/galleries' }}>
                                    <a className={`${location === 'galleries' ? styles.active : ''}`}>Gallery</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.exhibits}`}>
                                <Link href={{ pathname: '/exhibits' }}>
                                    <a className={`${location === 'exhibits' ? styles.active : ''}`}>Exhibits</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.blog}`}>
                                <Link href={{ pathname: '/photography-blog' }}>
                                    <a className={`${location === 'photography-blog' ? styles.active : ''}`}>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navSection} ref={designNav}>
                        <h3>Design</h3>
                        <ul onClick={() => setOpen(false)}>
                            <li className={`${styles.navLink} ${styles.portfolio}`}>
                                <Link href={{ pathname: '/portfolio' }}>
                                    <a className={`${location === 'portfolio' ? styles.active : ''}`}>Portfolio</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.services}`}>
                                <Link href={{ pathname: '/services' }}>
                                    <a className={`${location === 'services' ? styles.active : ''}`}>Services</a>
                                </Link>
                            </li>
                            <li className={`${styles.navLink} ${styles.shop}`}>
                                <Link href={{ pathname: '/shop' }}>
                                    <a className={`${location === 'shop' ? styles.active : ''}`}>Shop</a>
                                </Link>
                            </li>
                            {cart.length > 0 && (
                                <li className={`${styles.navLink} ${styles.cart}`}>
                                    <Link href={{ pathname: '/shop/cart' }}>
                                        <a className={`${location === 'cart' ? styles.active : ''}`}>
                                            <i className="fas fa-shopping-cart"></i> (
                                            {cart.reduce((acc, item) => item.quantity + acc, 0)})
                                        </a>
                                    </Link>
                                </li>
                            )}
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
