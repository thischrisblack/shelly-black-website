import Link from 'next/link';
import { IShopItem } from '../utils/shopping-cart';
import styles from './SidebarPost.module.scss';

export default function AlsoLike({
    siteProps,
    alsoLikeItemSet,
}: {
    siteProps: any;
    alsoLikeItemSet: Array<IShopItem>;
}) {
    return (
        <>
            <h3>Also in the shop:</h3>
            {alsoLikeItemSet.map((item) => (
                <div className={styles.singlePost} key={item.id}>
                    <div className={styles.postImage}>
                        <Link href={{ pathname: `/shop/${item.id}` }}>
                            <a>
                                <img
                                    src={`${siteProps.url}/images/${item.image}?nf_resize=fit&w=300`}
                                    alt={item.imageAlt}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.postTitle}>
                        <Link href={{ pathname: `/shop/${item.id}` }}>
                            <h4>
                                <a>{item.title}</a>
                            </h4>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
