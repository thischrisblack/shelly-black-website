import styles from './ColorBar.module.scss';

export default function ColorBar() {
    return (
        <div className={styles.colorbar}>
            <div className={styles.blue}></div>
            <div className={styles.aqua}></div>
            <div className={styles.lime}></div>
            <div className={styles.yellow}></div>
            <div className={styles.red}></div>
            <div className={styles.fuchsia}></div>
        </div>
    );
}
