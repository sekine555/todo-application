export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", gaMeasurementId, {
    page_path: url,
  });
};
