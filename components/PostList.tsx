import Link from 'next/link';
import { IPostFrontmatter } from '../utils/content-retrieval';

export default function PostList({
    posts,
}: {
    posts: Array<IPostFrontmatter>;
}) {
    if (posts === []) return null;

    return (
        <div>
            {(!posts || posts.length === 0) && <div>No posts!</div>}
            <ul>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <Link href={{ pathname: `/post/${post.id}` }}>
                                    <a>{post.title}</a>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}