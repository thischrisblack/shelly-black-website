import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/Layout';
import PreviousAndNext from '../../components/PreviousAndNext';
import {
    BlogCategories,
    contentPaths,
    getAllIds,
    getPreviousAndNextFrontmatter,
    getSinglePost,
    IPostFrontmatter,
} from '../../utils/content-retrieval';
import { ImageTransformations } from '../../utils/get-absolute-image-path';
import styles from '../../styles/Content.module.scss';

export default function BlogPost({
    siteTitle,
    previousAndNext,
    frontmatter,
    content,
}: {
    siteTitle: string;
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
    frontmatter: any;
    content: string;
}) {
    if (!frontmatter) return <></>;

    return (
        <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <article className={styles.container}>
                <div className={styles.meta}>
                    <p>
                        {new Date(frontmatter.date).toLocaleDateString([], {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <h2>{frontmatter.title}</h2>
                    <p>
                        <em>{frontmatter.category}</em>
                    </p>
                </div>
                <div className={styles.content}>
                    <img src={frontmatter.image} />
                    <ReactMarkdown source={content} escapeHtml={false} />
                </div>
                <div className={styles.postNav}>
                    <PreviousAndNext previousAndNext={previousAndNext} />
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { postname } = ctx.params;

    const config = await import(`../../siteconfig.json`);
    const postData = getSinglePost(postname as string, contentPaths.blog, {
        transformation: ImageTransformations.Fit,
        w: 920,
        h: null,
    });

    const previousAndNextPosts = getPreviousAndNextFrontmatter(
        postname as string,
        contentPaths.blog,
        postData.frontmatter.category as BlogCategories,
        { transformation: ImageTransformations.Smartcrop, w: 300, h: 150 }
    );

    return {
        props: {
            siteTitle: config.title,
            previousAndNext: previousAndNextPosts,
            ...postData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.blog).map((id) => `/blog/${id}`);
    return {
        paths,
        fallback: false,
    };
};
