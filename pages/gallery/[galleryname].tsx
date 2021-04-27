import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Lightbox from 'react-image-lightbox';
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
    ISiteProps,
} from '../../utils/content-retrieval';
import { useState } from 'react';
import { ImageTransformations } from '../../utils/image-path-helpers';

export default function Gallery({
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
    siteTitle: string;
    previousAndNext: { previous: IPostFrontmatter; next: IPostFrontmatter };
    frontmatter: any;
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

    const images = frontmatter.galleryImages;

    return (
        <Layout
            pageTitle={`${siteProps.title} | ${frontmatter.title}`}
            description={excerpt || siteProps.description}
            url={`${siteProps.url}/gallery/${slug}`}
            image={ogImage}
        >
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
                        {images.map((image, index) => (
                            <div
                                key={image}
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

                    {isOpen && (
                        <Lightbox
                            mainSrc={`/${images[photoIndex]}`}
                            nextSrc={`/${images[(photoIndex + 1) % images.length]}`}
                            prevSrc={`/${images[(photoIndex + images.length - 1) % images.length]}`}
                            onCloseRequest={() => setOpen(false)}
                            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                        />
                    )}
                </div>
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { galleryname } = ctx.params;

    const { default: siteProps }: { default: ISiteProps } = await import(`../../siteconfig.json`);

    const galleryData = getSinglePost(
        galleryname as string,
        contentPaths.galleries,
        {
            transformation: ImageTransformations.Fit,
            w: 920,
            h: null,
        },
        siteProps
    );

    const previousAndNextPosts = getPreviousAndNextFrontmatter(
        galleryname as string,
        contentPaths.galleries,
        galleryData.frontmatter.category[0] as BlogCategories,
        { transformation: ImageTransformations.Smartcrop, w: 300, h: 150 }
    );

    return {
        props: {
            slug: galleryname,
            siteProps,
            previousAndNext: previousAndNextPosts,
            ...galleryData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllIds(contentPaths.galleries).map((id) => `/gallery/${id}`);
    return {
        paths,
        fallback: false,
    };
};
