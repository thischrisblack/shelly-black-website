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

const LibraryBlog = ({
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
                    <h2>Library &amp; Archive Blog</h2>
                </div>
                <div className={styles.content}>
                    <PostList posts={posts} />
                </div>
            </article>
        </Layout>
    );
};

export default LibraryBlog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.blog, BlogCategories.Library, {
            transformation: ImageTransformations.Smartcrop,
            w: 600,
            h: 450,
        }) || [];

    return {
        props: {
            posts: allPostsFrontmatter,
            title: configData.default.title,
        },
    };
};
