import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
import { ParallaxProvider } from "react-scroll-parallax";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParallaxProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <Analytics />
        </QueryClientProvider>
      </BrowserRouter>
    </ParallaxProvider>
  </React.StrictMode>
);
