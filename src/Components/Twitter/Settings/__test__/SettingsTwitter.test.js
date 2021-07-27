import React from "react";

import Keys from "../Keys/Keys";
import WebHooks from "../Webhooks/WebHooks";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../../Redux/Reducer/initialState";
import { reducer } from "../../../../Redux/Reducer/reducer";
import { Provider } from "react-redux";
import Modal from "react-modal";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import "intersection-observer";
afterEach(cleanup);

describe("Twitter ===>>> Settings test Suite", () => {
  let store;
  Modal.setAppElement(document.createElement("div"));
  store = createStore(reducer);

  it("should have initial state", () => {
    expect(reducer(initialState, { type: "NULL" })).toEqual(initialState);
  });

  test("Keys Test", async () => {
    const component = render(
      <Router>
        <Provider store={store}>
          <Keys />
        </Provider>
      </Router>
    );

    let { keys } = store.getState();
    expect(keys[0]).toEqual(undefined);

    fireEvent.change(component.getByTestId("field0"), {
      target: { value: "gaurvendra0" },
    });
    fireEvent.change(component.getByTestId("field1"), {
      target: { value: "gaurvendra1" },
    });
    fireEvent.change(component.getByTestId("field2"), {
      target: { value: "gaurvendra2" },
    });
    fireEvent.change(component.getByTestId("field3"), {
      target: { value: "gaurvendra3" },
    });
    fireEvent.click(component.getByTestId("button0"));
    let key = store.getState().keys;
    expect(key[0]).toEqual({
      apiKey: "gaurvendra0",
      apiSecret: "gaurvendra1",
      accessToken: "gaurvendra2",
      accessTokenSecret: "gaurvendra3",
    });

    fireEvent.change(component.getByTestId("field4"), {
      target: { value: "gaurvendra4" },
    });
    fireEvent.click(component.getByTestId("button1"));
    let tok = store.getState().claimerToken;
    expect(tok).toEqual("gaurvendra4");
  });

  test("Webhooks Test", async () => {
    const component = render(
      <Router>
        <Provider store={store}>
          <WebHooks />
        </Provider>
      </Router>
    );

    let { webHooks } = store.getState();
    expect(webHooks[0]).toEqual(undefined);

    fireEvent.change(component.getByTestId("field0"), {
      target: { value: "gaurvendra0" },
    });
    fireEvent.change(component.getByTestId("field1"), {
      target: { value: "gaurvendra1" },
    });

    fireEvent.click(component.getByTestId("button0"));
    let webHook = store.getState().webHooks;
    expect(webHook[0]).toEqual({
      name: "gaurvendra0",
      url: "gaurvendra1",
    });
  });
});
