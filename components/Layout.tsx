import Head from 'next/head';
import Navigation from './Navigation';

export default function Layout({
    pageTitle,
    children,
}: {
    pageTitle: string;
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
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            </Head>
            <Navigation />
            <section className="layout">
                <div className="content">{children}</div>
            </section>
        </>
    );
}
