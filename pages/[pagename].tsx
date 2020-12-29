import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';
// Just using same styles as posts for now.
import styles from './blog/Post.module.scss';
import Layout from '../components/Layout';

import {
    contentPaths,
    getAllIds,
    getSinglePost,
} from '../utils/content-retrieval';

export default function PageContainer({
    siteTitle,
    frontmatter,
    content,
}: {
    siteTitle: string;
    frontmatter: any;
    content: string;
}) {
    if (!frontmatter) return <></>;

    return (
        <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <article className={styles.post}>
                <div className={styles.meta}>
                    <h2>{frontmatter.title}</h2>
                    {frontmatter.image && <img src={frontmatter.image} />}
                </div>
                <div className={styles.content}>
                    <ReactMarkdown source={content} escapeHtml={false} />
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { pagename } = ctx.params;

    const pageData = getSinglePost(pagename as string, contentPaths.pages);
    const config = await import(`../siteconfig.json`);

    return {
        props: {
            siteTitle: config.title,
            ...pageData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.pages).map((id) => `/${id}`);
    return {
        paths,
        fallback: false,
    };
};
