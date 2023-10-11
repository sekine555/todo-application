import "destyle.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/configAutofillSelectednput.css";
import "tailwindcss/tailwind.css";
import GoogleTagManager from "@/components/googleTagManage";
import * as gtag from "@/utils/gtag";
import { googleTagManagerId } from "@/utils/gtm";
import { GTMId } from "@/components/googleTagManage/GoogleTagManage";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const nextRouter = useRouter();
  useEffect(() => {
    if (!gtag.gaMeasurementId) return;

    // client側でのページ遷移時にGAのpageviewが発火されるようにする
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    nextRouter.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      nextRouter.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [nextRouter.events]);
  return (
    <>
      <GoogleTagManager gTMId={googleTagManagerId as GTMId} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
