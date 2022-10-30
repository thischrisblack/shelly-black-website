import Layout from '../../components/Layout';
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
                    <p>
                        Are you a purrrocessing archivist? If yes, you'll want
                        to get your paws on this enamel pin of a kitty in an
                        archival storage box. This is also the purrfect gift for
                        the archivist, librarian, or historian in your life who
                        loves cats. Available for purrchase while supplies last.
                        1 x 1.25 inches, black metal finish and black rubber
                        clutch
                    </p>
                    <form
                        action="https://www.paypal.com/cgi-bin/webscr"
                        method="post"
                        target="_top"
                    >
                        <input type="hidden" name="cmd" value="_s-xclick" />
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
                </div>
            </article>
        </Layout>
    );
};

export default Shop;
