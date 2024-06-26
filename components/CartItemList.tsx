import Link from 'next/link';
import { IShopItem } from '../utils/shopping-cart';
import styles from './CartItemList.module.scss';
import QuantityControls from './QuantityControls';

export default function CartItemList({ items, siteProps }: { items: Array<IShopItem>; siteProps: any }) {
    return (
        <div className={styles.cartItemList}>
            {(!items || items.length === 0) && <div>No items to display.</div>}
            <ol>
                {items &&
                    items.map((item) => {
                        return (
                            <li className={styles.cartItem} key={item.id}>
                                <div className={styles.cartItemImage}>
                                    <Link
                                        href={{
                                            pathname: `/shop/${item.id}`,
                                        }}
                                    >
                                        <img
                                            src={`${siteProps.url}/images/${item.image}?nf_resize=fit&w=840`}
                                            alt={item.imageAlt}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.cartItemTitle}>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className={styles.cartItemDetails}>
                                    {item.quantity} {item.title}
                                    {item.quantity > 1 ? 's' : ''} at ${item.price}/ea.
                                </div>
                                <div className={styles.cartItemQuantity}>
                                    <QuantityControls item={item} />
                                </div>
                                <div className={styles.cartItemPrice}>${(item.quantity * item.price).toFixed(2)}</div>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}
