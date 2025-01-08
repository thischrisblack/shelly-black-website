import Head from 'next/head';
import Navigation from './Navigation';
import 'react-image-lightbox/style.css';
import { dom } from '@fortawesome/fontawesome-svg-core';

export default function Layout({
    pageTitle,
    description,
    url,
    image,
    children,
}: {
    pageTitle: string;
    description: string;
    url: string;
    image: {
        src: string;
        alt: string;
    };
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image.src} />
                <meta property="og:image:alt" content={image.alt} />
                <meta property="og:url" content={url} />
                <meta property="og:type" content="article" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image.src} />
                <meta property="twitter:image:alt" content={image.alt} />
                <meta name="twitter:card" content="summary_large_image" />
                <script src="https://kit.fontawesome.com/a3d3e90f49.js" crossOrigin="anonymous"></script>
                <style type="text/css">{dom.css()}</style>
            </Head>
            <Navigation path={url} />
            <section>{children}</section>
        </>
    );
}
