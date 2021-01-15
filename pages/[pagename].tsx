import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';
import ContactForm from '../components/ContactForm';

import Layout from '../components/Layout';
import {
    contentPaths,
    getAllIds,
    getSinglePost,
} from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/image-path-helpers';
import styles from '../styles/Content.module.scss';

export default function PageContainer({
    slug,
    siteProps,
    frontmatter,
    content,
    ogImage,
    excerpt,
}: {
    slug: string;
    siteProps: any;
    frontmatter: any;
    content: string;
    ogImage: string;
    excerpt: string;
}) {
    if (!frontmatter) return <></>;
    return (
        <Layout
            pageTitle={`${siteProps.title} | ${frontmatter.title}`}
            description={frontmatter.description || siteProps.description}
            url={`${siteProps.url}/${slug}`}
            image={`${siteProps.url}/${ogImage || siteProps.image}`}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>{frontmatter.title}</h2>
                    {frontmatter.image && <img src={`/${frontmatter.image}`} />}
                </div>
                <div className={styles.content}>
                    <ReactMarkdown source={content} escapeHtml={false} />
                    {slug === 'about' && <ContactForm />}
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { pagename } = ctx.params;
    const config = await import(`../siteconfig.json`);
    const pageData = getSinglePost(pagename as string, contentPaths.pages, {
        transformation: ImageTransformations.Fit,
        w: 350,
        h: null,
    });
    return {
        props: {
            slug: pagename,
            siteProps: config.default,
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
