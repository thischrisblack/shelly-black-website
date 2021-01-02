import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    BlogCategories,
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/get-absolute-image-path';
import styles from '../styles/Content.module.scss';

const PhotographyBlog = ({
    posts,
    title,
}: {
    posts: Array<IPostFrontmatter>;
    title: string;
}) => {
    return (
        <Layout pageTitle={`${title} | Library & Archive Blog`}>
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Photography Blog</h2>
                </div>
                <div className={styles.content}>
                    <PostList posts={posts} />
                </div>
            </article>
        </Layout>
    );
};

export default PhotographyBlog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.blog, BlogCategories.Photography, {
            transformation: ImageTransformations.Smartcrop,
            w: 600,
            h: 400,
        }) || [];
    return {
        props: {
            posts: allPostsFrontmatter,
            title: configData.default.title,
        },
    };
};
