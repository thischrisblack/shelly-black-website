import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { BlogCategories, contentPaths, getAllPostFrontmatter, IPostFrontmatter } from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/image-path-helpers';
import styles from '../styles/Content.module.scss';

const PhotographyBlog = ({ siteProps, posts }: { siteProps: any; posts: Array<IPostFrontmatter> }) => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Photography Blog`}
            description="Shelly Black's blog about photography."
            url={`${siteProps.url}/photography-blog`}
            image={{
                src: `${siteProps.url}/images/FoodCity10.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Black and white photo of a carnival.',
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Photography Blog</h2>
                </div>
                <div className={styles.content}>
                    <PostList posts={posts} postType="blog" />
                </div>
            </article>
        </Layout>
    );
};

export default PhotographyBlog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const config = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.blog, BlogCategories.Photography, {
            transformation: ImageTransformations.Smartcrop,
            w: 600,
            h: 450,
        }) || [];
    return {
        props: {
            siteProps: config.default,
            posts: allPostsFrontmatter,
        },
    };
};
