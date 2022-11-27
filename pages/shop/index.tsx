import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import { IShopItem } from '../../utils/shopping-cart';
import { GetStaticProps } from 'next';
import { ISiteProps } from '../../utils/content-retrieval';
import { IIndex } from '../../utils/types';
import InventoryList from '../../components/InventoryList';

const Shop = ({ siteProps, inventory }: { siteProps: any; inventory: IIndex<IShopItem> }) => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Shop`}
            description="Shelly Black's design shop."
            url={`${siteProps.url}/shop`}
            image={{
                src: `${siteProps.url}/images/cat_pin_pencil_1.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Enamel pin with smiling gray kitty sitting in an archival box with the lid open.',
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Design Shop</h2>
                </div>
                <div className={styles.content}>
                    <InventoryList items={Object.values(inventory)} siteProps={siteProps} />
                </div>
            </article>
        </Layout>
    );
};

export default Shop;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);
    const { inventory } = await import('../../utils/shopping-cart');
    return {
        props: {
            siteProps,
            inventory,
        },
    };
};
