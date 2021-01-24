import Link from 'next/link';
import { IPostFrontmatter } from '../utils/content-retrieval';
import styles from './SidebarPost.module.scss';

export default function SidebarPost({
    post,
    previousOrNext,
    postType,
}: {
    post: IPostFrontmatter;
    previousOrNext: string;
    postType: string;
}) {
    return (
        <div className={styles.singlePost}>
            <h3>{previousOrNext}:</h3>
            <div className={styles.postImage}>
                <Link href={{ pathname: `/${postType}/${post.id}` }}>
                    <a>
                        <img src={`/${post.image.src}`} alt={post.image.alt} />
                    </a>
                </Link>
            </div>
            <div className={styles.postTitle}>
                <Link href={{ pathname: `/${postType}/${post.id}` }}>
                    <h4>
                        <a>{post.title}</a>
                    </h4>
                </Link>
            </div>
        </div>
    );
}
