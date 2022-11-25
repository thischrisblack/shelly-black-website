import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/cart.slice';
import { IShopItem } from '../utils/shopping-cart';
import styles from './QuantityControls.module.scss';

export default function CartControls({ item }: { item: IShopItem }) {
    const dispatch = useDispatch();

    return (
        <div>
            {(item?.quantity ?? 0) < 1 && <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>}

            {(item?.quantity ?? 0) >= 1 && (
                <div className={styles.quantityControls}>
                    <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
            )}
        </div>
    );
}
