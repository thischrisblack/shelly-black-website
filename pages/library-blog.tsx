import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../utils/get-absolute-image-path';
import styles from '../styles/Content.module.scss';

const Index = ({
    posts,
    title,
}: {
    posts: Array<IPostFrontmatter>;
    title: string;
}) => {
    return (
        <Layout pageTitle={`${title} | Library & Archive Blog`}>
            <article className={styles.container}>
                <div className={styles.meta}>GAH</div>
                <div className={styles.content}>
                    <p>GUH</p>
                    <PostList posts={posts} />
                </div>
            </article>
        </Layout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter = getAllPostFrontmatter(contentPaths.blog) || [];
    const postsWithRootImageUrl = allPostsFrontmatter.map((post) => {
        return {
            ...post,
            image: getAbsoluteImageUrl(
                post.image,
                ImageTransformations.Smartcrop,
                200,
                200
            ),
        };
    });
    const onlyLibraryPosts = postsWithRootImageUrl.filter(
        (post) => post.category === 'Library & Archival Work'
    );
    return {
        props: {
            posts: onlyLibraryPosts,
            title: configData.default.title,
        },
    };
};
