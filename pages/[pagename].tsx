import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';
import styles from '../styles/Content.module.scss';
import Layout from '../components/Layout';

import {
    contentPaths,
    getAllIds,
    getSinglePost,
} from '../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../utils/get-absolute-image-path';

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
            <article className={styles.container}>
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
    const config = await import(`../siteconfig.json`);
    const pageData = getSinglePost(pagename as string, contentPaths.pages);
    const postDataWithRootImageUrl = {
        ...pageData,
        frontmatter: {
            ...pageData.frontmatter,
            image: getAbsoluteImageUrl(
                pageData.frontmatter.image,
                ImageTransformations.Fit,
                350,
                null
            ),
        },
    };
    return {
        props: {
            siteTitle: config.title,
            ...postDataWithRootImageUrl,
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
