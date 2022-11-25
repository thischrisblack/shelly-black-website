import Link from 'next/link';
import { IShopItem } from '../utils/shopping-cart';
import styles from './InventoryList.module.scss';

export default function InventoryList({ items, siteProps }: { items: Array<IShopItem>; siteProps: any }) {
    return (
        <div className={styles.inventoryList}>
            {(!items || items.length === 0) && <div>No posts to display.</div>}
            <ol>
                {items &&
                    items.map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={{
                                    pathname: `/shop/${item.id}`,
                                }}
                            >
                                <li className={styles.inventoryItem}>
                                    <div className={styles.inventoryImage}>
                                        <a>
                                            <img
                                                src={`${siteProps.url}/images/${item.image}?nf_resize=fit&w=840`}
                                                alt={item.imageAlt}
                                            />
                                        </a>
                                    </div>
                                    <div className={styles.inventoryTitle}>
                                        <h3>
                                            <a>{item.title}</a>
                                        </h3>
                                        <div
                                            className={styles.postDate}
                                            dangerouslySetInnerHTML={{ __html: `${item.shortDescription}` }}
                                        ></div>
                                    </div>
                                </li>
                            </Link>
                        );
                    })}
            </ol>
        </div>
    );
}
