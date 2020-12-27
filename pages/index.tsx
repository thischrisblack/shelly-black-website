import { GetStaticProps } from 'next';
import Link from 'next/link';
import styles from './Home.module.scss';

import {
    contentPaths,
    getAllPostFrontmatter,
    IPostFrontmatter,
} from '../utils/content-retrieval';
import {
    getAbsoluteImageUrl,
    ImageTransformations,
} from '../utils/get-absolute-image-path';

const Index = ({
    posts,
    title,
    description,
}: {
    posts: Array<IPostFrontmatter>;
    title: string;
    description: string;
}) => {
    return (
        <>
            <div className={styles.name}>{title}</div>
            <div className={styles.container}>
                <div className={styles.about}>{description}</div>
                <div className={styles.sections}>
                    <Link href={{ pathname: '/libraries' }}>
                        <h1>
                            <a>Library &amp; Archival&nbsp;Work</a>
                        </h1>
                    </Link>
                    <Link href={{ pathname: '/photography' }}>
                        <h1>
                            <a>Photography</a>
                        </h1>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const configData = await import(`../siteconfig.json`);
    const allPostsFrontmatter = getAllPostFrontmatter(contentPaths.blog) || [];
    const postsWithRootImageUrl = allPostsFrontmatter.map((post) => {
        return {
            ...post,
            image: getAbsoluteImageUrl(
                post.image,
                ImageTransformations.Smartcrop,
                200,
                200
            ),
        };
    });
    return {
        props: {
            posts: postsWithRootImageUrl,
            title: configData.default.title,
            description: configData.default.description,
        },
    };
};
