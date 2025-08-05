import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/es/integration/react";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { Loader } from "./components/Loader/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
