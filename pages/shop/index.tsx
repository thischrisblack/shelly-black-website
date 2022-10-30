import Layout from '../../components/Layout';
import { ImageTransformations } from '../../utils/image-path-helpers';
import styles from '../../styles/Content.module.scss';
import * as siteProps from '../../siteconfig.json';

const Shop = () => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Shop`}
            description="Shelly Black's design shop."
            url={`${siteProps.url}/shop`}
            image={{
                src: `${siteProps.url}/images/library-default.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Boxes on library shelves.',
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Design Shop</h2>
                </div>
                <div className={styles.content}>
                    <h2>Cat Pin</h2>
                </div>
            </article>
        </Layout>
    );
};

export default Shop;
