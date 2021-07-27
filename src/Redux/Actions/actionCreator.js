/**
 * Redux Action module
 * @module Redux-action
 */

/**
 * @file actionCreator.js contains all the redux actions
 * @author Vibhor
 */

/**
 * Toggle Safe Mode Action
 * @param {object} mode - payload
 * @returns {Object} - Object with payload
 */
export const toggleSafeMode = (mode) => ({
  type: "TOGGLE_SAFE_MODE",
  payload: mode,
});

export const toggleJoinerMode = () => ({
  type: "TOGGLE_JOINER",
});

export const toggleOpenerMode = () => ({
  type: "TOGGLE_OPENER",
});

export const addChannelIdLinkOpener = (id) => ({
  type: "ADD_CHANNEL_ID_LINK_OPENER",
  payload: id,
});
export const removeChannelIdFromListLinkOpener = (id) => ({
  type: "REMOVE_CHANNEL_ID_LINK_OPENER",
  payload: id,
});
export const toggleLinkOpener = (val) => ({
  type: "TOGGLE_LINK_OPENER",
  payload: val,
});
export const setURLAppender = (url) => ({
  type: "SET_URL_APPENDER",
  payload: url,
});
export const toggleURLAppender = (url) => ({ type: "TOGGLE_URL_APPENDER" });

export const addChannelIdListInviteJoiner = (id) => ({
  type: "ADD_CHANNEL_ID_INVITE_JOINER",
  payload: id,
});
export const removeChannelIdFromListInviteJoiner = (id) => ({
  type: "REMOVE_CHANNEL_ID_INVITE_JOINER",
  payload: id,
});
export const toggleInviteJoiner = () => ({ type: "TOGGLE_INVITE_JOINER" });

export const keywordTwitter = (keyword) => ({
  type: "KEYWORD_TWITTER",
  payload: keyword,
});

export const deleteKeywordTwitter = (id) => ({
  type: "DELETE_KEYWORD_TWITTER",
  payload: id,
});

//User Action Twitter

export const addUserTwitter = (user) => ({
  type: "ADD_USER_TWITTER",
  payload: user,
});

export const deleteUserTwitter = (id) => ({
  type: "DELETE_USER_TWITTER",
  payload: id,
});

//Keys Twitter

export const addKeys = (keys) => ({
  type: "ADD_SETTINGS_KEYS",
  payload: keys,
});

export const addClaimerToken = (token) => ({
  type: "ADD_CLAIMER_TOKEN",
  payload: token,
});

//WebHook
export const saveWebhook = (webhook) => ({
  type: "SETTING_ADD_WEBHOOK",
  payload: webhook,
});

export const removeWebhook = (id) => ({
  type: "SETTING_REMOVE_WEBHOOK",
  payload: id,
});

//Chrome User
export const saveChromeUser = (user) => ({
  type: "SETTING_ADD_CHROMEUSER",
  payload: user,
});

export const removeChromeUser = (id) => ({
  type: "SETTING_REMOVE_CHROMEUSER",
  payload: id,
});

export const editChromeUser = (value, id) => ({
  type: "SETTING_EDIT_CHROMEUSER",
  payload: { value, id },
});

//Fetching Tweets
export const storeTweets = (latestTweet) => async (dispatch, getState) => {
  try {
    const { tweets } = getState();

    let flag = false;
    tweets.forEach((element) => {
      console.log("element.text ",element);
      console.log("latestTweet.text ",latestTweet);
      if (element.text === latestTweet.text) {
        console.log("element = latest");
        flag = true;
      }
    });
    if (flag === true) {
      latestTweet = "";
      return;
    }

    dispatch({
      type: "FETCH_TWEETS",
      payload: latestTweet,
    });
    dispatch({
      type: "STORE_TWEET_INFO",
      payload: latestTweet,
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearLatestTweets = () => ({
  type: "CLEAR_LATEST_TWEETS",
});

export const toggleswitch = () => ({
  type: "TOGGLE_SWITCH_BUTTON",
});

export const clearFeaturedTweets = () => ({
  type: "CLEAR_FEATURED_TWEETS",
});

export const addFeaturedTweet =
  (tweet, featureType, originalText, name) => (dispatch, getState) => {
    const { featuredTweets } = getState();
    var newTweet = tweet;
    featuredTweets.forEach((element) => {
      if (element.text === tweet) {
        newTweet = "";
      }
    });
    dispatch({
      type: "ADD_FEATURED_TWEET",
      payload: { newTweet, featureType, originalText, name },
    });
  };

export const keywordDiscord = (addOrDelete, keyword) => ({
  type: "KEYWORD_DISCORD",
  payload: { addOrDelete, keyword },
});

export const setDelay = (delay) => ({ type: "SET_DELAY", payload: delay });

export const handleCheckbox = (boxType) => ({
  type: "HANDLE_CHECKBOX",
  payload: boxType,
});

export const createAccount = (name, type, value) => ({
  type: "CREATE_ACCOUNT",
  payload: { name, type, value },
});
export const editAccount = (name, type, value, id) => ({
  type: "EDIT_ACCOUNT",
  payload: { name, type, value, id },
});
export const deleteAccount = (id) => ({ type: "DELETE_ACCOUNT", payload: id });

export const setWebHook = (hook) => ({ type: "SET_WEBHOOK", payload: hook });
export const toggleWebHookButtons = (index) => ({
  type: "TOGGLE_BUTTONS_WEBHOOK",
  payload: index,
});

export const setBGAnimation = () => ({ type: "SET_BACKGROUND_ANIMATION" });

export const createChromeUserDiscord = (name) => ({
  type: "CREATE_CHROME_USER_DISCORD",
  payload: name,
});
export const deleteChromeUserDiscord = (id) => ({
  type: "DELETE_CHROME_USER_DISCORD",
  payload: id,
});

export const selectChromeProfile = (name) => ({
  type: "SELECT_CHROME_PROFILE",
  payload: name,
});
export const unSelectChromeProfile = (id) => ({
  type: "UNSELECT_CHROME_PROFILE",
  payload: id,
});

export const clearLogs = () => ({ type: "CLEAR_LOGS" });
export const addToLogs = (data) => ({ type: "ADD_TO_LOGS", payload: data });

export const selectMonitorLO = (token) => ({
  type: "SELECT_MONITOR_TOKEN_LO",
  payload: token,
});
export const selectMonitorIJ = (token) => ({
  type: "SELECT_MONITOR_TOKEN_IJ",
  payload: token,
});
export const selectClaimerIJ = (token) => ({
  type: "SELECT_CLAIMER_TOKEN_IJ",
  payload: token,
});

export const toggleLoading = (val, message = "") => ({
  type: "TOGGLE_LOADING",
  payload: { val, message },
});

export const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const showUserProfile = (val) => ({
  type: "SHOW_USER_PROFILE",
  payload: val,
});

export const addChannelNameFromId = (id, name, section) => ({
  type: "ADD_CHANNEL_NAME",
  payload: { id, name, type: section },
});
