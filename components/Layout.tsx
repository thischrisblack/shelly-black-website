import Head from 'next/head';
import Navigation from './Navigation';
import 'react-image-lightbox/style.css';

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
    image: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
                <script
                    src="https://kit.fontawesome.com/a3d3e90f49.js"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <Navigation />
            <section>{children}</section>
        </>
    );
}
