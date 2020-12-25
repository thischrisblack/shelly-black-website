import Link from 'next/link';
import { IPostFrontmatter } from '../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../utils/get-absolute-image-path';

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
                        const imgSrc = getAbsoluteImageUrl(
                            post.image,
                            ImageTransformations.Smartcrop,
                            200,
                            200
                        );
                        return (
                            <li key={post.id}>
                                <img src={imgSrc} />
                                <Link href={{ pathname: `/post/${post.id}` }}>
                                    <a>{post.title}</a>
                                </Link>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}
