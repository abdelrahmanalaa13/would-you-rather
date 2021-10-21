import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middelware from "./middelware";

const store = createStore(reducer, middelware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
