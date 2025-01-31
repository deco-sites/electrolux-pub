import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";
const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: Electrolux Sans;
              src: url(${
              asset("/fonts/ElectroluxSans-Regular.woff2")
            }) format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
           @font-face {
              font-family: Electrolux Sans;
              src: url(${
              asset("/fonts/ElectroluxSans-SemiBold.woff2")
            }) format('woff2');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
              @font-face {
              font-family: Electrolux Sans;
              src: url(${
              asset("/fonts/ElectroluxSans-Bold.woff2")
            }) format('woff2');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            `,
          }}
        >
        </style>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
