import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { googleTagManagerId } from "@/utils/gtm";
import { gaMeasurementId } from "@/utils/gtag";

class MyDocument extends Document<{ prefix: string | undefined }> {
  render() {
    return (
      <Html lang="jp" prefix={this.props.prefix}>
        <Head>
          {/* Google Analytics */}
          {gaMeasurementId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                crossOrigin="anonymous"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}');`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
