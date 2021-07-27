import React from "react";
import Invite from "../inviteJoiner";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../../Redux/Reducer/initialState";
import { reducer } from "../../../../Redux/Reducer/reducer";
import { Provider } from "react-redux";

import { createStore } from "redux";

afterEach(cleanup);

describe("Discord ===>>> Invite-Joiner test Suite", () => {
  let store;
  store = createStore(reducer);

  it("should have initial state", () => {
    expect(reducer(initialState, { type: "NULL" })).toEqual(initialState);
  });

  test("Basic Component Renders", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );
  });

  test("Monitor Token", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );
    const input = component.getByTestId("monitor");
    fireEvent.change(input, {
      target: { value: "234" },
    });
  });

  test("claimer Token", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );
    const input = component.getByTestId("claimer");
    fireEvent.change(input, {
      target: { value: "123" },
    });
  });
  test("Add Delay", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    let delay = store.getState().delay;
    expect(delay).toEqual(600);

    const input = component.getByTestId("delay");
    fireEvent.change(input, { target: { value: 400 } });
    delay = store.getState().delay;
    expect(parseInt(delay)).toEqual(400);
  });

  test("SafeMode Test", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    let mode = store.getState().safeMode;
    expect(mode).toEqual(true);

    const input = component.getByTestId("safemode");
    fireEvent.click(input);
    mode = store.getState().safeMode;
    expect(mode).toEqual(false);
  });
  test("Channel Id Test", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    let list = store.getState().channelIdListInviteJoiner;
    expect(list[0]).toEqual(undefined);

    const form = component.getByTestId("form");
    fireEvent.change(form, { target: { value: "gaurvendra" } });
    const button = component.getByTestId("button");
    fireEvent.click(button);
    list = store.getState().channelIdListInviteJoiner;
    expect(list[0]).toEqual("gaurvendra");
  });
  test("Invite Joiner Test", async () => {
    const component = render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    let list = store.getState().start;
    expect(list.inviteJoiner).toEqual(false);

    const form = component.getByTestId("main");
    fireEvent.click(form);
    list = store.getState().start;
    expect(list.inviteJoiner).toEqual(false);
  });
});
