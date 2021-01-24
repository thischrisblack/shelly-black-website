import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import {
    BlogCategories,
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/image-path-helpers';
import styles from '../styles/Content.module.scss';

const InternshipBlog = ({
    siteProps,
    posts,
}: {
    siteProps: any;
    posts: Array<IPostFrontmatter>;
}) => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Internship Blog`}
            description="Shelly Black's blog about her library internship."
            url={`${siteProps.url}/library-blog`}
            image={`${siteProps.url}/images/library-boxes.jpg?nf_resize=smartcrop&w=1200&h=627`}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Internship Blog</h2>
                </div>
                <div className={styles.content}>
                    <PostList posts={posts} postType="blog" />
                </div>
            </article>
        </Layout>
    );
};

export default InternshipBlog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const config = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.blog, BlogCategories.Internship, {
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
