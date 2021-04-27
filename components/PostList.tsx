import Link from 'next/link';
import { IPostFrontmatter } from '../utils/content-retrieval';
import styles from './PostList.module.scss';

export default function PostList({ posts, postType }: { posts: Array<IPostFrontmatter>; postType: string }) {
    return (
        <div className={styles.postList}>
            {(!posts || posts.length === 0) && <div>No posts to display.</div>}
            <ol>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id} className={styles.postItem}>
                                <div className={styles.postImage}>
                                    <Link
                                        href={{
                                            pathname: `/${postType}/${post.id}`,
                                        }}
                                    >
                                        <a>
                                            <img src={post.image.src} alt={post.image.alt} />
                                        </a>
                                    </Link>
                                </div>
                                <div className={styles.postTitle}>
                                    <Link
                                        href={{
                                            pathname: `/${postType}/${post.id}`,
                                        }}
                                    >
                                        <h3>
                                            <a>{post.title}</a>
                                        </h3>
                                    </Link>
                                </div>
                                <div className={styles.postDate}>{post.date}</div>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}
