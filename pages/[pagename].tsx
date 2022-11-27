import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';
import ContactForm from '../components/ContactForm';

import Layout from '../components/Layout';
import { contentPaths, getAllIds, getSinglePost, IPostFrontmatter, ISiteProps } from '../utils/content-retrieval';
import { ImageTransformations } from '../utils/image-path-helpers';
import styles from '../styles/Content.module.scss';

export default function PageContainer({
    slug,
    siteProps,
    frontmatter,
    content,
    ogImage,
}: {
    slug: string;
    siteProps: any;
    frontmatter: IPostFrontmatter;
    content: string;
    ogImage: {
        src: string;
        alt: string;
    };
}) {
    if (!frontmatter) return <></>;

    return (
        <Layout
            pageTitle={`${siteProps.title} | ${frontmatter.title}`}
            description={frontmatter.description || siteProps.description}
            url={`${siteProps.url}/${slug}`}
            image={ogImage}
        >
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>{frontmatter.title}</h2>
                    {frontmatter.image && <img src={`/${frontmatter.image.src}`} alt={frontmatter.image.alt} />}
                </div>
                <div className={styles.content}>
                    <ReactMarkdown source={content} escapeHtml={false} />
                    {slug === 'about' && <ContactForm showSocial={false} />}
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { pagename } = ctx.params;

    const { default: siteProps }: { default: ISiteProps } = await import(`../siteconfig.json`);

    const pageData = getSinglePost(
        pagename as string,
        contentPaths.pages,
        {
            transformation: ImageTransformations.Fit,
            w: 350,
            h: null,
        },
        siteProps
    );

    return {
        props: {
            slug: pagename,
            siteProps,
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
