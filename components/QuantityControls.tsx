import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/cart.slice';
import { IShopItem } from '../utils/shopping-cart';
import styles from './QuantityControls.module.scss';

export default function CartControls({ item }: { item: IShopItem }) {
    const dispatch = useDispatch();

    return (
        <>
            {(item?.quantity ?? 0) < 1 && (
                <div className={styles.quantityControls}>
                    <button className={styles.addToCart} onClick={() => dispatch(addToCart(item))}>
                        Add to Cart
                    </button>
                </div>
            )}

            {(item?.quantity ?? 0) >= 1 && (
                <div className={styles.quantityControls}>
                    <button className={styles.quantity} onClick={() => dispatch(decrementQuantity(item.id))}>
                        <i className="fas fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button className={styles.quantity} onClick={() => dispatch(incrementQuantity(item.id))}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            )}
        </>
    );
}
