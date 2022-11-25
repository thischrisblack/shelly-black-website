import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IShopItem } from '../utils/shopping-cart';
import styles from './CheckOutButton.module.scss';

export default function CheckOutButton() {
    const cart = useSelector((state: { cart: Array<IShopItem> }) => state.cart ?? []);
    const cartTotal = useSelector((state: { cart: Array<IShopItem> }) =>
        (state.cart ?? []).reduce((acc, item) => acc + item.quantity * item.price, 0)
    );

    return (
        cart.length > 0 && (
            <div className={styles.checkOutButton}>
                <Link href="/shop/cart" passHref>
                    <button>Checkout ${cartTotal}</button>
                </Link>
            </div>
        )
    );
}
