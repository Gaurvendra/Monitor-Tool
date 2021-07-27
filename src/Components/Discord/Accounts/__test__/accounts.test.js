import React from "react";
import Accounts from "../accounts";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../../Redux/Reducer/initialState";
import { reducer } from "../../../../Redux/Reducer/reducer";
import { Provider } from "react-redux";
import Modal from "../Modal/modal";
import { createStore } from "redux";
afterEach(cleanup);

describe("Discord ===>>> Account test Suite", () => {
  let store;
  store = createStore(reducer);

  it("should have initial state", () => {
    expect(reducer(initialState, { type: "NULL" })).toEqual(initialState);
  });

  test("Basic Component Renders", async () => {
    const component = render(
      <Provider store={store}>
        <Accounts />
      </Provider>
    );
  });

  test("Add Account", async () => {
    const vari = true;
    const show = (status) => {
      const val = status;
    };
    const component = render(
      <Provider store={store}>
        <Modal showModal={vari} setShowModal={show} />
      </Provider>
    );

    let monitorTokens = store.getState().monitorTokens;
    expect(monitorTokens[0]).toEqual(undefined);

    const input0 = component.getByTestId("field0");
    fireEvent.change(input0, { target: { value: "gaurvendra" } });

    const input1 = component.getByTestId("field1");
    fireEvent.change(input1, { target: { value: "discord" } });

    const input2 = component.getByTestId("field2");
    fireEvent.change(input2, { target: { value: "rgdfvbjkhnbytrftg" } });

    fireEvent.click(component.getByTestId("button0"));
    monitorTokens = store.getState().monitorTokens;
    expect(monitorTokens[0]).toEqual({
      id: 1,
      name: "gaurvendra",
      type: "discord",
      value: "rgdfvbjkhnbytrftg",
    });
  });
});
