import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Lightbox from 'react-image-lightbox';

import Layout from '../../components/Layout';
import PreviousAndNext from '../../components/PreviousAndNext';
import {
    BlogCategories,
    contentPaths,
    getAllIds,
    getPreviousAndNextFrontmatter,
    getSinglePost,
    IPostFrontmatter,
    ISiteProps,
} from '../../utils/content-retrieval';
import { ImageTransformations } from '../../utils/image-path-helpers';
import styles from '../../styles/Content.module.scss';
import { useEffect, useState } from 'react';

export default function BlogPost({
    slug,
    siteProps,
    previousAndNext,
    frontmatter,
    content,
    ogImage,
    excerpt,
}: {
    slug: string;
    siteProps: any;
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
    frontmatter: IPostFrontmatter;
    content: string;
    ogImage: {
        src: string;
        alt: string;
    };
    excerpt: string;
}) {
    if (!frontmatter) return <></>;

    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const { galleryImages } = frontmatter;

    useEffect(() => {
        // Find embedded Twitter elements and append the script tag.
        const twitterEmbedElement = document.getElementsByClassName('twitter-embed')[0];
        if (twitterEmbedElement) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            twitterEmbedElement.appendChild(script);
        }
    }, []);

    return (
        <Layout
            pageTitle={`${siteProps.title} | ${frontmatter.title}`}
            description={excerpt || siteProps.description}
            url={`${siteProps.url}/blog/${slug}`}
            image={ogImage}
        >
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
                    <div>
                        {(frontmatter.category as Array<string>).map((category: string) => (
                            <div key={category}>{category}</div>
                        ))}
                    </div>
                </div>
                <div className={styles.content}>
                    <img src={`/${frontmatter.image.src}`} alt={frontmatter.image.alt} />

                    <ReactMarkdown source={content} escapeHtml={false} />

                    {galleryImages && (
                        <div className={styles.boxedContent}>
                            <div className={styles.imageGallery}>
                                {galleryImages.map((image, index) => (
                                    <div
                                        className={styles.galleryImage}
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setOpen(true);
                                        }}
                                    >
                                        <img src={`/${image}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isOpen && (
                        <Lightbox
                            mainSrc={`/${galleryImages[photoIndex]}`}
                            nextSrc={`/${galleryImages[(photoIndex + 1) % galleryImages.length]}`}
                            prevSrc={`/${
                                galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length]
                            }`}
                            onCloseRequest={() => setOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex((photoIndex + galleryImages.length - 1) % galleryImages.length)
                            }
                            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % galleryImages.length)}
                        />
                    )}
                </div>
                <div className={styles.postNav}>
                    <PreviousAndNext previousAndNext={previousAndNext} postType="blog" />
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { postname } = ctx.params;

    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);

    const postData = getSinglePost(
        postname as string,
        contentPaths.blog,
        {
            transformation: ImageTransformations.Fit,
            w: 920,
            h: null,
        },
        siteProps
    );

    const previousAndNextPosts = getPreviousAndNextFrontmatter(
        postname as string,
        contentPaths.blog,
        postData.frontmatter.category[0] as BlogCategories,
        { transformation: ImageTransformations.Smartcrop, w: 300, h: 150 }
    );

    return {
        props: {
            slug: postname,
            siteProps,
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
