import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import shopStyles from './Shop.module.scss';
import * as siteProps from '../../siteconfig.json';
import Link from 'next/link';

const Shop = () => {
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
                    <h2>Cat Archivist Pin</h2>
                </div>
                <div className={styles.content}>
                    <div className={shopStyles.containerShop}>
                        <div className={shopStyles.image}>
                            <img
                                src={`${siteProps.url}/images/cat_pin_pencil_1.jpg?nf_resize=fit&w=840`}
                                alt="Enamel pin with smiling gray kitty sitting in an archival box with the lid open."
                            />
                        </div>
                        <div className={shopStyles.description}>
                            <p>
                                Are you a purrrocessing archivist? If so, you'll
                                want to get your paws on this enamel pin of a
                                kitty in an archival storage box.
                            </p>
                            <p>
                                This is also the purrfect gift for the
                                archivist, librarian, or historian in your life
                                who loves cats.
                            </p>
                            <p>Available for purrchase while supplies last!</p>
                            <p>
                                🐶 Dog version coming soon!{' '}
                                <Link href={{ pathname: '/about' }}>
                                    <a>Contact me</a>
                                </Link>{' '}
                                if you'd like to know when they're available.
                            </p>
                        </div>
                        <div className={shopStyles.button}>
                            <p className={shopStyles.price}>$14.99</p>
                            <p className={shopStyles.shipping}>
                                <i>free shipping</i>
                            </p>
                            <form
                                action="https://www.paypal.com/cgi-bin/webscr"
                                method="post"
                                target="_top"
                            >
                                <input
                                    type="hidden"
                                    name="cmd"
                                    value="_s-xclick"
                                />
                                <input
                                    type="hidden"
                                    name="encrypted"
                                    value="-----BEGIN PKCS7-----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-----END PKCS7-----"
                                />
                                <input
                                    type="image"
                                    src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                                    name="submit"
                                    alt="PayPal - The safer, easier way to pay online!"
                                />
                                <img
                                    alt=""
                                    src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                                    width="1"
                                    height="1"
                                />
                            </form>

                            <div className={shopStyles.details}>
                                <ul>
                                    <li>1 x 1.25 inches</li>
                                    <li>black metal finish</li>
                                    <li>black rubber clutch</li>
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
