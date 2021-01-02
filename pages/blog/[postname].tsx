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
} from '../../utils/content-retrieval';
import { ImageTransformations } from '../../utils/get-absolute-image-path';
import styles from '../../styles/Content.module.scss';
import { useState } from 'react';

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
    frontmatter: any;
    content: string;
    ogImage: string;
    excerpt: string;
}) {
    if (!frontmatter) return <></>;

    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const { galleryImages } = frontmatter;
    return (
        <Layout
            pageTitle={`${siteProps.title} | ${frontmatter.title}`}
            description={excerpt || siteProps.description}
            url={`${siteProps.url}/blog/${slug}`}
            image={ogImage || siteProps.image}
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
                    <p>
                        <em>{frontmatter.category}</em>
                    </p>
                </div>
                <div className={styles.content}>
                    <img src={frontmatter.image} />

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
                                        <img src={image} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isOpen && (
                        <Lightbox
                            mainSrc={galleryImages[photoIndex]}
                            nextSrc={
                                galleryImages[
                                    (photoIndex + 1) % galleryImages.length
                                ]
                            }
                            prevSrc={
                                galleryImages[
                                    (photoIndex + galleryImages.length - 1) %
                                        galleryImages.length
                                ]
                            }
                            onCloseRequest={() => setOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex(
                                    (photoIndex + galleryImages.length - 1) %
                                        galleryImages.length
                                )
                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex(
                                    (photoIndex + 1) % galleryImages.length
                                )
                            }
                        />
                    )}
                </div>
                <div className={styles.postNav}>
                    <PreviousAndNext
                        previousAndNext={previousAndNext}
                        postType="blog"
                    />
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
            slug: postname,
            siteProps: config.default,
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
