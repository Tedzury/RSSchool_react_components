import { default as fetch, Headers, Request, Response } from 'node-fetch';

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
});

import '../styles/global.css';
import { AppProps } from 'next/dist/pages/_app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      id="root"
      className="bg-main-bg flex min-h-[100dvh] w-full justify-center"
    >
      <Component {...pageProps} />
    </div>
  );
}
