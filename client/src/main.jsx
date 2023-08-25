import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
// import { StripeProvider } from "react-stripe-elements";
//

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <StripeProvider apiKey={stripeKey}> */}
        <App />
        {/* </StripeProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
