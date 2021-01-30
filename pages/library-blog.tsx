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

const LibraryBlog = ({
    siteProps,
    posts,
}: {
    siteProps: any;
    posts: Array<IPostFrontmatter>;
}) => {
    return (
        <Layout
            pageTitle={`${siteProps.title} | Library & Archive Blog`}
            description="Shelly Black's blog about librarianship and archival work."
            url={`${siteProps.url}/library-blog`}
            image={{
                src: `${siteProps.url}/images/library-default.jpg?nf_resize=smartcrop&w=1200&h=627`,
                alt: 'Boxes on library shelves.',
            }}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>Library &amp; Archive Blog</h2>
                </div>
                <div className={styles.content}>
                    <PostList posts={posts} postType="blog" />
                </div>
            </article>
        </Layout>
    );
};

export default LibraryBlog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const config = await import(`../siteconfig.json`);
    const allPostsFrontmatter =
        getAllPostFrontmatter(contentPaths.blog, BlogCategories.Library, {
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
