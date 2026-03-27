import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={getTheme("light")}>
        <CssBaseline />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <RecentlyViewedProvider>
                <App />
              </RecentlyViewedProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

