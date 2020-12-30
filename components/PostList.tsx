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
            <ol>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <div className="listImage">
                                    <img src={post.image} />
                                </div>
                                <Link href={{ pathname: `/blog/${post.id}` }}>
                                    <h2>
                                        <a>{post.title}</a>
                                    </h2>
                                </Link>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}
