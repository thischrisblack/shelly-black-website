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
                        <h1>Shelly Black</h1>
                    </div>
                    <div className={styles.photo}>
                        <h3>Photography</h3>
                    </div>
                    <div className={styles.library}>
                        <h3>Library &amp; Archive Work</h3>
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
