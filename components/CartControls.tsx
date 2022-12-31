import { useSelector } from 'react-redux';
import { IShopItem } from '../utils/shopping-cart';
import styles from './CartControls.module.scss';
import CheckOutButton from './CheckOutButton';
import QuantityControls from './QuantityControls';

export default function CartControls({ item }: { item: IShopItem }) {
    const stateItem = useSelector((state: { cart: Array<IShopItem> }) => state.cart?.find((i) => i.id === item.id));

    return (
        <div className={styles.cartControls}>
            <QuantityControls item={stateItem ?? item} />

            {(stateItem?.quantity ?? 0) >= 1 && (
                <div className={styles.subTotal}>
                    ${(stateItem.quantity * item.price).toFixed(2)}
                    {item.shipping.price > 0 && ' + shipping'}
                </div>
            )}

            <CheckOutButton />
        </div>
    );
}
