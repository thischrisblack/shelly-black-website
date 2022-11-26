import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import { IShopItem } from '../../utils/shopping-cart';
import { GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { useSelector } from 'react-redux';
import CartItemList from '../../components/CartItemList';
import { useEffect, useState } from 'react';
import shopStyles from './Shop.module.scss';
import ContactForm from '../../components/ContactForm';

const Cart = ({ siteProps }: { siteProps: any }) => {
    const cart = useSelector((state: { cart: Array<IShopItem> }) => state.cart ?? []);

    const [destination, setDestination] = useState(null);

    useEffect(() => {
        setDestination(null);
    }, []);

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
                    <h2>Your Order</h2>
                </div>
                <div className={styles.content}>
                    <h3>Your items</h3>
                    <CartItemList items={cart} siteProps={siteProps} />
                    <h3>Shipping</h3>
                    <div className={shopStyles.destinationControls}>
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
                                Orders outside the U.S. require special shipping. Please send me a message about your
                                order and I'll get back to you shortly.
                            </p>
                            <ContactForm
                                title={'International Shipping Contact Form'}
                                showAddress={true}
                                showSocial={false}
                                prefilledMessage={
                                    'My order: \n' + cart.map((item) => `${item.title} (Qty ${item.quantity})\n`).join()
                                }
                            />
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
