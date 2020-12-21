import Head from "next/head";

function PageHead ({ title,
    description,
    currentURL }) {
    return (
        <Head>
            <title key="title">{title}</title>
            <meta
            charSet="UTF-8"
            key="charset"
            />
            <meta
            content="initial-scale=1.0, width=device-width"
            key="viewport"
            name="viewport"
            />
            <meta
            content={description}
            key="description"
            name="description"
            />

            <meta
            content="summary"
            key="twcard"
            name="twitter:card"
            />
            <meta
            content="@Kieran6dev"
            key="twhandle"
            name="twitter:creator"
            />

            <meta
            content={title}
            key="ogtitle"
            property="og:title"
            />
            <meta
            content={description}
            key="ogdescription"
            property="og:description"
            />
            <meta
            content="website"
            key="ogtype"
            property="og:type"
            />
            <meta
            content={currentURL}
            key="ogurl"
            property="og:url"
            />
            <meta
            content="./images/home-screenshot.jpg"
            key="ogimage"
            property="og:image"
            />
            <meta
            content="https://kieranroberts.dev"
            key="ogsite"
            property="og:site_name"
            />

            <link
            href="./images/head/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
            />
            <link
            href="./images/head/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
            />
            <link
            href="./images/head/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
            />
            <link
            color="#000000"
            href="./images/head/safari-pinned-tab.svg"
            rel="mask-icon"
            />
            <link
            href="./images/head/favicon.ico"
            rel="shortcut icon"
            />

            <meta
            content="#ffffff"
            name="msapplication-TileColor"
            />
            <meta
            content="./images/head/browserconfig.xml"
            name="msapplication-config"
            />
            <meta
            content="#ffffff"
            name="theme-color"
            />
        </Head>
    );
}

export default PageHead;
