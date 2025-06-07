import { Decimal } from "decimal.js";
import { NuqsAdapter } from "nuqs/adapters/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router";

import { AppRouter } from "./AppRouter";

import checkAppConfig from "./lib/checkAppConfig";

import "./services/obyteWsClient"; // obyte client

import "./globals.css";

checkAppConfig();

// the precision is slightly less than that of IEEE754 double
// the range is slightly wider (9e308 is still ok here but Infinity in double) to make sure numeric data feeds can be safely read.  When written, overflowing datafeeds will be saved as strings only
Decimal.set({
  precision: 15, // double precision is 15.95 https://en.wikipedia.org/wiki/IEEE_754
  rounding: Decimal.ROUND_HALF_EVEN,
  maxE: 308, // double overflows between 1.7e308 and 1.8e308
  minE: -324, // double underflows between 2e-324 and 3e-324
  toExpNeg: -7, // default, same as for js number
  toExpPos: 21, // default, same as for js number
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NuqsAdapter>
          <AppRouter />
        </NuqsAdapter>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(reg => console.log('Service Worker registered →', reg.scope))
      .catch(err => console.error('SW registration error:', err));
  });
}
