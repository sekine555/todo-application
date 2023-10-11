import NextHead from "next/head";
import { FC } from "react";

interface Props {
  title?: string;
  viewport?: string;
  description?: string;
  keywords?: string;
  pagePath?: string;
  ogType?: string;
  ogImagePath?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImage?: string;
}

const basePath = process.env.NEXT_PUBLIC_FE_ENDPOINT;

export const Head: FC<Props> = (props) => {
  const {
    title: _title,
    viewport = "width=device-width,initial-scale=1.0",
    description: _description = "TODOアプリケーションです。",
    keywords = "TODO",
    pagePath: _pagePath,
    ogType = "website",
    ogImagePath: _ogImagePath,
    ogImageWidth = "1200",
    ogImageHeight = "630",
    ogImage,
  } = props;
  const siteName = "TODOアプリ";
  const title = _title ? `TODOアプリ | ${_title}` : siteName;
  const description = _description;
  const ogUrl = _pagePath ? `${basePath}${_pagePath}` : basePath;
  const ogImagePath = ogImage ? ogImage : `${basePath}/og-image.png`;
  const faviconUrl = `${basePath}/favicon.png`;

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href={faviconUrl} />
      <meta name={"viewport"} content={viewport} data-dynamic="true" />
      <meta name={"description"} content={description} data-dynamic="true" />
      <meta name={"keywords"} content={keywords} data-dynamic="true" />
      <meta property="og:url" content={ogUrl} data-dynamic="true" />
      <meta property="og:type" content={ogType} data-dynamic="true" /> 
      <meta property="og:title" content={title} data-dynamic="true" />
      <meta
        property="og:description"
        content={description}
        data-dynamic="true"
      />
      <meta property="og:site_name" content={siteName} data-dynamic="true" />
      <meta property="og:image" content={ogImagePath} data-dynamic="true" />
      <meta
        property="og:image:width"
        content={ogImageWidth}
        data-dynamic="true"
      />
      <meta
        property="og:image:height"
        content={ogImageHeight}
        data-dynamic="true"
      />
    </NextHead>
  );
};
