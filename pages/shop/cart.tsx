import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import { IShopItem } from '../../utils/shopping-cart';
import { GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { useSelector } from 'react-redux';
import CartItemList from '../../components/CartItemList';

const Cart = ({ siteProps }: { siteProps: any }) => {
    const cart = useSelector((state: { cart: Array<IShopItem> }) => state.cart ?? []);
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
                    <CartItemList items={cart} siteProps={siteProps} />
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
