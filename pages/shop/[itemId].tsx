import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import shopStyles from './Shop.module.scss';
import siteProps from '../../siteconfig.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { inventory, IShopItem } from '../../utils/shopping-cart';

const Shop = ({ slug, siteProps, item }: { slug: string; siteProps: any; item: IShopItem }) => {
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        setDestination(null);
    }, []);

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
                    <div className={shopStyles.containerShop}>
                        <div className={shopStyles.image}>
                            <img
                                src={`${siteProps.url}/images/${item.image}?nf_resize=fit&w=840`}
                                alt={item.imageAlt}
                            />
                        </div>
                        <div className={shopStyles.description}>
                            <div dangerouslySetInnerHTML={{ __html: `${item.description}` }}></div>
                            {slug === 'cat-archivist-pin' && inventory['dog-archivist-pin'] == null && (
                                <p>
                                    🐶 Dog version coming soon!{' '}
                                    <Link href={{ pathname: '/about' }}>
                                        <a>Contact me</a>
                                    </Link>{' '}
                                    if you'd like to know when they're available.
                                </p>
                            )}
                        </div>
                        <div className={shopStyles.button}>
                            <p className={shopStyles.price}>${item.price}</p>

                            <p>Cart stuff here</p>

                            <div className={shopStyles.details}>
                                <ul>
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

export default Shop;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { itemId } = ctx.params;

    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);

    const item = inventory[itemId as string];

    return {
        props: {
            slug: itemId,
            siteProps,
            item,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.keys(inventory).map((id) => `/shop/${id}`);
    return {
        paths,
        fallback: false,
    };
};
