import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import shopStyles from './Shop.module.scss';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { IShopItem } from '../../utils/shopping-cart';
import { IIndex } from '../../utils/types';
import CartControls from '../../components/CartControls';

// TODO: Implement sold out contact stuff like https://shop.bubblesort.io/products/cache-cats-dot-biz-zine?variant=1196004949

const ShopItem = ({
    slug,
    siteProps,
    item,
    inventory,
}: {
    slug: string;
    siteProps: any;
    item: IShopItem;
    inventory: IIndex<IShopItem>;
}) => {
    return (
        <Layout
            pageTitle={`${item.title} | Shop`}
            description={item.description}
            url={`${siteProps.url}/shop/${slug}`}
            image={{
                src: `${siteProps.url}/images/${item.image}?nf_resize=smartcrop&w=1200&h=627`,
                alt: `${item.imageAlt}`,
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>{item.title}</h2>
                </div>
                <div className={styles.content}>
                    {item.estimatedInStockDate != null && (
                        <div className={shopStyles.outOfStock}>
                            <h3>Out of Stock</h3>
                            <p>
                                The {item.title} is currently out of stock, but more are on the way. I expect to be able
                                to ship new orders by <strong>{item.estimatedInStockDate}</strong>. If that works for
                                you, feel free to order now.
                            </p>
                            <p>
                                Otherwise,{' '}
                                <Link href={{ pathname: '/about' }}>
                                    <a>contact me</a>
                                </Link>{' '}
                                and I'll let you know when they're available again.
                            </p>
                        </div>
                    )}
                    <div className={shopStyles.containerShop}>
                        <div className={shopStyles.image}>
                            <img
                                src={`${siteProps.url}/images/${item.image}?nf_resize=fit&w=840`}
                                alt={item.imageAlt}
                            />
                        </div>
                        <div className={shopStyles.description}>
                            <div dangerouslySetInnerHTML={{ __html: `${item.description}` }}></div>
                        </div>
                        <div className={shopStyles.button}>
                            <p className={shopStyles.price}>${item.price}</p>

                            <CartControls item={item} />

                            <div className={shopStyles.details}>
                                <ul>
                                    {item.estimatedInStockDate != null && (
                                        <li className={shopStyles.alert} key={0}>
                                            Estimated in-stock date: {item.estimatedInStockDate}
                                        </li>
                                    )}
                                    {item.shipping.price === 0 && <li>Free shipping!</li>}
                                    {item.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default ShopItem;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { itemId } = ctx.params;

    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);
    const { inventory } = await import('../../utils/shopping-cart');

    const item = inventory[itemId as string];

    return {
        props: {
            slug: itemId,
            siteProps,
            item,
            inventory,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { inventory } = await import('../../utils/shopping-cart');
    const paths = Object.keys(inventory).map((id) => `/shop/${id}`);
    return {
        paths,
        fallback: false,
    };
};
