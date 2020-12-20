import Head from 'next/head';
import Header from './Header';

export default function Layout({ children, ...props }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            </Head>
            <Header />
            <section className="layout">
                <div className="content">{children}</div>
            </section>
            <footer>Built by me!</footer>
        </>
    );
}
