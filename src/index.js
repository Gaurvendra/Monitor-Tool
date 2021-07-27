import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { reducer } from "./Redux/Reducer/reducer";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persistedState",
  storage,
};

const perm = persistReducer(persistConfig, reducer);
const middleware = [thunk];
const store = createStore(perm, applyMiddleware(...middleware));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

store.subscribe(() => console.log(store.getState()));
