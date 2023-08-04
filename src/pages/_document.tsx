import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="ss.utl" content="A SSUTL PORTFOLIO." />
        <meta
          name="keywords"
          content="University of manchester, student, technology, mechatronics"
        />

        <link rel="icon" href="/icon.jpg" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />

        {/* <!-- HTML Meta Tags --> */}
        <meta
          name="description"
          content="Somewhere in Manny with my headphones on. UOM Engineer, tap in for gems and vibes, sumn humble, sumn subtle. Ever so, ever so. HFWI ⚡"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://kton.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Highlight Manager" />
        <meta
          property="og:description"
          content="Somewhere in Manny with my headphones on. UOM Engineer, tap in for gems and vibes, sumn humble, sumn subtle. Ever so, ever so. HFWI ⚡"
        />
        <meta property="og:image" content="%PUBLIC_URL%/seo.jpg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ssutl.com" />
        <meta property="twitter:url" content="https://ssutl.com/" />
        <meta name="twitter:title" content="A SSUTL PORTFOLIO" />
        <meta
          name="twitter:description"
          content="Somewhere in Manny with my headphones on. UOM Engineer, tap in for gems and vibes, sumn humble, sumn subtle. Ever so, ever so. HFWI ⚡"
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/seo.jpg" />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz -->

        <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    --> */}
        <link rel="apple-touch-icon" sizes="512x512" href="seo.jpg" />

        {/* <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    --> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
