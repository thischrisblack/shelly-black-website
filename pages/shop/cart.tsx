import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import { IShopItem } from '../../utils/shopping-cart';
import { GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { useSelector } from 'react-redux';
import CartItemList from '../../components/CartItemList';
import { useEffect, useState } from 'react';
import cartStyles from './Cart.module.scss';
import ContactForm from '../../components/ContactForm';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cart.slice';
import { useRouter } from 'next/router';

const Cart = ({ siteProps }: { siteProps: any }) => {
    const dispatch = useDispatch();

    const {
        query: { message },
    } = useRouter();

    const cart = useSelector((state: { cart: Array<IShopItem> }) => state.cart ?? []);

    const itemTotal = useSelector((state: { cart: Array<IShopItem> }) =>
        (state.cart ?? []).reduce((acc, item) => {
            return parseFloat((acc + item.quantity * item.price).toFixed(2));
        }, 0.0)
    );

    const shipping = useSelector(
        (state: { cart: Array<IShopItem> }) =>
            Math.ceil(
                (state.cart ?? []).reduce((acc, item) => {
                    return acc + item.quantity;
                }, 0) / 4
            ) * 5
    );

    const [destination, setDestination] = useState(null);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [paymentCompletedMessage, setPaymentCompletedMessage] = useState(null);

    useEffect(() => {
        setDestination(null);
    }, []);

    const paypalCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (shipping + itemTotal).toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: itemTotal.toFixed(2),
                            },
                            shipping: {
                                currency_code: 'USD',
                                value: shipping.toFixed(2),
                            },
                        },
                    },
                    items: cart.map((item) => {
                        return {
                            name: item.title,
                            quantity: item.quantity,
                            unit_amount: {
                                currency_code: 'USD',
                                value: item.price.toFixed(2),
                            },
                        };
                    }),
                },
            ],
        });
    };

    const paypalOnApprove = (data, actions) => {
        return actions.order.capture().then(function () {
            // Your code here after capture the order
            console.log(data);
            const orderString = cart
                .map((item) => {
                    return `${item.quantity} ${item.title}${item.quantity > 1 ? 's' : ''}`;
                })
                .join(', ');
            const message = `You ordered ${orderString} and your order ID is ${data.orderID}. If you have any questions please contact me at <a href="mailto:shop@shelly-black.com">shop@shelly-black.com</a>.`;
            setPaymentCompletedMessage(message);
            dispatch(resetCart());
            setPaymentCompleted(true);
        });
    };

    return (
        <Layout
            pageTitle={`${siteProps.title} | Your Order`}
            description="Your order."
            url={`${siteProps.url}/shop/cart`}
            image={{
                src: `${siteProps.url}/images/cat_pin_pencil_1.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Enamel pin with smiling gray kitty sitting in an archival box with the lid open.',
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Cart</h2>
                </div>
                <div className={styles.content}>
                    {message === 'sent' && (
                        <>
                            <h3>Thank you!</h3>
                            <p>Your message has been sent and I'll get back to you soon with the shipping cost.</p>
                        </>
                    )}

                    {paymentCompleted && (
                        <>
                            <h3>Thank you!</h3>
                            <p dangerouslySetInnerHTML={{ __html: paymentCompletedMessage }}></p>
                        </>
                    )}

                    {!paymentCompleted && !message && (
                        <>
                            <h3>Your items</h3>
                            <CartItemList items={cart} siteProps={siteProps} />

                            {cart.length > 0 && (
                                <>
                                    <h3>Check Out</h3>

                                    <div className={cartStyles.destinationControls}>
                                        <div>
                                            <input
                                                type="radio"
                                                id="us"
                                                checked={destination === 'us'}
                                                name="destination"
                                                value="us"
                                                onChange={() => setDestination('us')}
                                            />
                                            <label htmlFor="us">Ship within the U.S.</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="international"
                                                checked={destination === 'international'}
                                                name="destination"
                                                value="international"
                                                onChange={() => setDestination('international')}
                                            />
                                            <label htmlFor="international">Ship outside the U.S.</label>
                                        </div>
                                    </div>

                                    {destination === 'international' && (
                                        <>
                                            <p>
                                                Orders outside the U.S. require special shipping. Please send me a
                                                message about your order and I'll get back to you shortly.
                                            </p>
                                            <ContactForm
                                                title={'International Shipping Contact Form'}
                                                showAddress={true}
                                                showSocial={false}
                                                orderInfo={cart
                                                    .map((item) => `${item.title} (Qty ${item.quantity})\n`)
                                                    .join()}
                                            />
                                        </>
                                    )}

                                    {destination === 'us' && (
                                        <>
                                            <div className={cartStyles.orderBox}>
                                                <div className={cartStyles.totals}>
                                                    <h2>Your Order</h2>
                                                    <div className={cartStyles.lineItem}>
                                                        <div className={cartStyles.lineItemDetail}>Item total</div>
                                                        <div className={cartStyles.lineItemAmount}>
                                                            ${itemTotal.toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <div className={cartStyles.lineItem}>
                                                        <div className={cartStyles.lineItemDetail}>Shipping</div>
                                                        <div className={cartStyles.lineItemAmount}>
                                                            ${shipping.toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <div className={`${cartStyles.lineItem} ${cartStyles.b}`}>
                                                        <div className={cartStyles.lineItemDetail}>ORDER TOTAL</div>
                                                        <div className={cartStyles.lineItemAmount}>
                                                            ${(itemTotal + shipping).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cartStyles.buttons}>
                                                    <PayPalButtons
                                                        createOrder={paypalCreateOrder}
                                                        forceReRender={[itemTotal, shipping]}
                                                        onApprove={paypalOnApprove}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </article>
        </Layout>
    );
};

export default Cart;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);
    return {
        props: {
            siteProps,
        },
    };
};
