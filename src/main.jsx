import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configStore";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
