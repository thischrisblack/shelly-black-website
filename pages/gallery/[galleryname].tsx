import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import styles from '../../styles/Content.module.scss';
import PreviousAndNext from '../../components/PreviousAndNext';

import Layout from '../../components/Layout';
import {
    BlogCategories,
    contentPaths,
    getAllIds,
    getPreviousAndNextFrontmatter,
    getSinglePost,
    IPostFrontmatter,
} from '../../utils/content-retrieval';
import { useState } from 'react';
import { ImageTransformations } from '../../utils/get-absolute-image-path';

export default function Gallery({
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

    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <article className={styles.container}>
                <div className={styles.meta}>
                    <h2>{frontmatter.title}</h2>
                    <p>
                        <em>{frontmatter.category}</em>
                    </p>
                </div>
                <div className={styles.content}>
                    <ReactMarkdown source={content} escapeHtml={false} />
                    <div className={styles.imageGallery}>
                        {frontmatter.galleryImages.map((image, index) => (
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

                    {isOpen && (
                        <Lightbox
                            mainSrc={frontmatter.galleryImages[photoIndex]}
                            nextSrc={
                                frontmatter.galleryImages[
                                    (photoIndex + 1) %
                                        frontmatter.galleryImages.length
                                ]
                            }
                            prevSrc={
                                frontmatter.galleryImages[
                                    (photoIndex +
                                        frontmatter.galleryImages.length -
                                        1) %
                                        frontmatter.galleryImages.length
                                ]
                            }
                            onCloseRequest={() => setOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex(
                                    (photoIndex +
                                        frontmatter.galleryImages.length -
                                        1) %
                                        frontmatter.galleryImages.length
                                )
                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex(
                                    (photoIndex + 1) %
                                        frontmatter.galleryImages.length
                                )
                            }
                        />
                    )}
                </div>
                <div className={styles.postNav}>
                    <PreviousAndNext
                        previousAndNext={previousAndNext}
                        postType="gallery"
                    />
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { galleryname } = ctx.params;

    const config = await import(`../../siteconfig.json`);

    const galleryData = getSinglePost(
        galleryname as string,
        contentPaths.galleries,
        {
            transformation: ImageTransformations.Fit,
            w: 920,
            h: null,
        }
    );

    const previousAndNextPosts = getPreviousAndNextFrontmatter(
        galleryname as string,
        contentPaths.galleries,
        galleryData.frontmatter.category as BlogCategories,
        { transformation: ImageTransformations.Smartcrop, w: 300, h: 150 }
    );

    return {
        props: {
            siteTitle: config.title,
            previousAndNext: previousAndNextPosts,
            ...galleryData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.galleries).map(
        (id) => `/gallery/${id}`
    );
    return {
        paths,
        fallback: false,
    };
};
