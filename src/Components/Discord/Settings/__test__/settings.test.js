import React from "react";
import Settings from "../settings";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../../Redux/Reducer/initialState";
import { reducer } from "../../../../Redux/Reducer/reducer";
import { Provider } from "react-redux";
import CreateProfileModal from "../createProfileModal/createProfileModal";
import { createStore } from "redux";
afterEach(cleanup);

describe("Discord ===>>> Settings test Suite", () => {
  let store;
  store = createStore(reducer);

  it("should have initial state", () => {
    expect(reducer(initialState, { type: "NULL" })).toEqual(initialState);
  });

  test("Basic Component Renders", async () => {
    const component = render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    const element = component.getByTestId("user");
    expect(element).toHaveTextContent("Welcome Gaurvendra#3023");
  });

  test("Background animation toggle", async () => {
    const component = render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    let { backgroundAnimations } = store.getState();
    expect(backgroundAnimations).toEqual(true);
    fireEvent.click(component.getByTestId("animation"));
    backgroundAnimations = store.getState().backgroundAnimations;
    expect(backgroundAnimations).toEqual(false);
    fireEvent.click(component.getByTestId("animation"));
  });

  test("Testing WebHook", async () => {
    const component = render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    let { webHookToggles } = store.getState();
    expect(webHookToggles[0]).toEqual(false);
    fireEvent.click(component.getByTestId("webhookswitch0"));
    let webHookToggles0 = store.getState().webHookToggles;
    expect(webHookToggles0[0]).toEqual(true);

    let webHookToggles1 = store.getState().webHookToggles;
    expect(webHookToggles1[1]).toEqual(false);
    fireEvent.click(component.getByTestId("webhookswitch1"));
    webHookToggles1 = store.getState().webHookToggles;
    expect(webHookToggles1[1]).toEqual(true);

    let webHookToggles2 = store.getState().webHookToggles;
    expect(webHookToggles[2]).toEqual(false);
    fireEvent.click(component.getByTestId("webhookswitch2"));
    webHookToggles2 = store.getState().webHookToggles;
    expect(webHookToggles2[2]).toEqual(true);

    let webHook = store.getState().webhook;
    expect(webHook).toEqual(null);

    const input = component.getByTestId("webhookField");
    fireEvent.change(input, { target: { value: "gaurvendra" } });

    fireEvent.click(component.getByTestId("webhookButton"));
    webHook = store.getState().webhook;
    expect(webHook).toEqual("gaurvendra");
  });
  test("Add User", async () => {
    const show = (status) => {
      const val = status;
    };
    const component = render(
      <Provider store={store}>
        <CreateProfileModal showModal={show} />
      </Provider>
    );

    let chromeUsersDiscord = store.getState().chromeUsersDiscord;
    expect(chromeUsersDiscord[0]).toEqual(undefined);

    const input = component.getByTestId("modalfield");
    fireEvent.change(input, { target: { value: "gaurvendra" } });

    fireEvent.click(component.getByTestId("modalbutton"));
    chromeUsersDiscord = store.getState().chromeUsersDiscord;
    expect(chromeUsersDiscord[0]).toEqual({
      id: 0,
      name: "gaurvendra",
      toggleOnOff: false,
    });
  });
});
