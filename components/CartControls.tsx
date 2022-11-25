import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/cart.slice';
import { IShopItem } from '../utils/shopping-cart';
import styles from './CartControls.module.scss';
import CheckOutButton from './CheckOutButton';

export default function CartControls({ item }: { item: IShopItem }) {
    const dispatch = useDispatch();
    const stateItem = useSelector((state: { cart: Array<IShopItem> }) => state.cart?.find((i) => i.id === item.id));

    return (
        <div className={styles.cartControls}>
            {(stateItem?.quantity ?? 0) < 1 && <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>}

            {(stateItem?.quantity ?? 0) >= 1 && (
                <div className={styles.quantityControls}>
                    <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                    <span>{stateItem.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
            )}

            {(stateItem?.quantity ?? 0) >= 1 && (
                <div className={styles.subTotal}>${stateItem.quantity * item.price} + shipping</div>
            )}

            <CheckOutButton />
        </div>
    );
}
