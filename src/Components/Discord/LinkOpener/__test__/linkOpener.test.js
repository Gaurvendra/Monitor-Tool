import React from "react";
import Link from "../linkOpener";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../../Redux/Reducer/initialState";
import { reducer } from "../../../../Redux/Reducer/reducer";
import { Provider } from "react-redux";

import { createStore } from "redux";

afterEach(cleanup);

describe("Discord ===>>> Link-Opener test Suite", () => {
  let store;
  store = createStore(reducer);

  it("should have initial state", () => {
    expect(reducer(initialState, { type: "NULL" })).toEqual(initialState);
  });

  test("Basic Component Renders", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );
  });

  test("Monitor Token", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );
    const input = component.getByTestId("monitor");
    fireEvent.change(input, {
      target: { value: "234" },
    });
  });

  test("Add Delay", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
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
        <Link />
      </Provider>
    );

    let mode = store.getState().safeMode;
    expect(mode).toEqual(true);

    const input = component.getByTestId("safemode");
    fireEvent.click(input);
    mode = store.getState().safeMode;
    expect(mode).toEqual(false);
  });

  test("Checkboxes Test", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );
    const twitter = component.getByTestId("twitter");
    let list = store.getState().options;
    expect(list.twitter).toEqual(false);
    fireEvent.click(twitter);
    list = store.getState().options;
    expect(list.twitter).toEqual(true);

    const invite = component.getByTestId("invite");
    let list1 = store.getState().options;
    expect(list1.invite).toEqual(false);
    fireEvent.click(invite);
    list1 = store.getState().options;
    expect(list1.invite).toEqual(true);

    const sound = component.getByTestId("sound");
    let list2 = store.getState().options;
    expect(list2.sound).toEqual(false);
    fireEvent.click(sound);
    list2 = store.getState().options;
    expect(list2.sound).toEqual(true);
  });

  test("Channel Id Test", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );

    let list = store.getState().channelIdListLinkOpener;
    expect(list[0]).toEqual(undefined);

    const form = component.getByTestId("form");
    fireEvent.change(form, { target: { value: "gaurvendra" } });
    const button = component.getByTestId("button");
    fireEvent.click(button);
    list = store.getState().channelIdListLinkOpener;
    expect(list[0]).toEqual("gaurvendra");
  });
  test("Add keywords Test", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );

    let list = store.getState().keywords_discord;
    expect(list[0]).toEqual(undefined);

    const form = component.getByTestId("form1");
    fireEvent.change(form, { target: { value: "gaurvendra" } });
    const button = component.getByTestId("button1");
    fireEvent.click(button);
    list = store.getState().keywords_discord;
    expect(list[0]).toEqual("gaurvendra");
  });

  test("Url Appender Test", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );

    let list = store.getState().urlAppenderEnable;
    expect(list).toEqual(false);

    const form = component.getByTestId("urlbutton");
    fireEvent.click(form);

    list = store.getState().urlAppenderEnable;
    expect(list).toEqual(true);
  });
  test("Link Opener Test", async () => {
    const component = render(
      <Provider store={store}>
        <Link />
      </Provider>
    );

    let list = store.getState().start;
    expect(list.linkOpener).toEqual(false);

    const form = component.getByTestId("main");
    fireEvent.click(form);
    list = store.getState().start;
    expect(list.linkOpener).toEqual(false);
  });
});
