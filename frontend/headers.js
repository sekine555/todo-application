const ContentSecurityPolicy =
    process.env.NODE_ENV === "production"
        ? `script-src 'self' https://www.googletagmanager.com/ 'sha256-NsM6H6uIopW7wiFDGfMBrbfiKZ2l48fWtenR/ceO51Y=';`
        : "";

module.exports = [
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Referrer-Policy",
        value: "same-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
];