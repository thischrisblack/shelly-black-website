import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';
import shopStyles from './Shop.module.scss';
import * as siteProps from '../../siteconfig.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        setDestination(null);
    }, []);

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
                                Are you a purrrocessing archivist? If so, you'll want to get your paws on this enamel
                                pin of a kitty in an archival storage box.
                            </p>
                            <p>
                                This is also the purrfect gift for the archivist, librarian, or historian in your life
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

                            <div className={shopStyles.destinationControls}>
                                <input
                                    type="radio"
                                    id="us"
                                    checked={destination === 'us'}
                                    name="destination"
                                    value="us"
                                    onChange={() => setDestination('us')}
                                />
                                <label htmlFor="us">Order within the U.S.</label>
                                <br />
                                <input
                                    type="radio"
                                    id="international"
                                    checked={destination === 'international'}
                                    name="destination"
                                    value="international"
                                    onChange={() => setDestination('international')}
                                />
                                <label htmlFor="international">Order outside the U.S.</label>
                            </div>

                            {destination === null && (
                                <p className={shopStyles.shipping}>
                                    <br />
                                    <br />
                                </p>
                            )}

                            {destination === 'international' && (
                                <p className={shopStyles.shipping}>
                                    If you live outside the U.S. please{' '}
                                    <Link href={{ pathname: '/about' }}>
                                        <a>contact me</a>
                                    </Link>
                                    .
                                </p>
                            )}

                            {destination === 'us' && (
                                <p className={shopStyles.shipping}>Add $5 shipping for a total of $19.99.</p>
                            )}

                            <div
                                className={
                                    [null, 'international'].includes(destination) ? shopStyles.disabled : undefined
                                }
                            >
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
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
                                </form>{' '}
                            </div>

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
