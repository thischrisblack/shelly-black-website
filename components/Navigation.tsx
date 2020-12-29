import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import styles from './Navigation.module.scss';

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
                        <h3>Library &amp Archive Work</h3>
                    </div>
                    <div className={styles.burger}>
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <div className={styles.colorbar}>
                        <div className={styles.blue}></div>
                        <div className={styles.aqua}></div>
                        <div className={styles.lime}></div>
                        <div className={styles.yellow}></div>
                        <div className={styles.red}></div>
                        <div className={styles.fuchsia}></div>
                    </div>
                </nav>
            </header>
        </>
    );
}
