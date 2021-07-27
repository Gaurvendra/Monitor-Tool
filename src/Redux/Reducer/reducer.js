import { initialState } from "./initialState";
import actionType from "../Actions/actionTypes";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_SAFE_MODE:
      return { ...state, safeMode: action.payload ? false : true };

    case actionType.ADD_CHANNEL_ID_INVITE_JOINER:
      return {
        ...state,
        channelIdListInviteJoiner: [
          ...state.channelIdListInviteJoiner,
          action.payload,
        ],
      };

    case actionType.REMOVE_CHANNEL_ID_INVITE_JOINER: {
      let newList = state.channelIdListInviteJoiner.filter(
        (id) => id !== action.payload
      );
      return { ...state, channelIdListInviteJoiner: newList };
    }

    case actionType.ADD_CHANNEL_ID_LINK_OPENER:
      return {
        ...state,
        channelIdListLinkOpener: [
          ...state.channelIdListLinkOpener,
          action.payload,
        ],
      };

    case actionType.REMOVE_CHANNEL_ID_LINK_OPENER: {
      let newList = state.channelIdListLinkOpener.filter(
        (id) => id !== action.payload
      );
      return { ...state, channelIdListLinkOpener: newList };
    }

    case actionType.KEYWORD_TWITTER: {
      let list;
      list = state.keywords_twitter;
      list = [...list, action.payload];

      return { ...state, keywords_twitter: list };
    }

    case actionType.DELETE_KEYWORD_TWITTER: {
      let list;
      list = state.keywords_twitter.filter(
        (key, index) => index !== action.payload
      );
      return { ...state, keywords_twitter: list };
    }

    case actionType.ADD_USER_TWITTER: {
      let list;
      list = state.users_twitter;
      list = [...list, action.payload];

      return { ...state, users_twitter: list };
    }

    case actionType.DELETE_USER_TWITTER: {
      let list;
      list = state.users_twitter.filter(
        (key, index) => index !== action.payload
      );
      return { ...state, users_twitter: list };
    }

    case actionType.ADD_SETTINGS_KEYS: {
      const { apiKey, apiSecret, accessToken, accessTokenSecret } =
        action.payload;
      var keyPairs = {
        apiKey,
        apiSecret,
        accessToken,
        accessTokenSecret,
      };
      return { ...state, keys: [...state.keys, keyPairs] };
    }
    case actionType.ADD_CLAIMER_TOKEN: {
      return { ...state, claimerToken: action.payload };
    }

    case actionType.SETTING_ADD_WEBHOOK: {
      const { name, url } = action.payload;
      var newWebHook = {
        name,
        url,
      };
      let list;
      list = state.webHooks;
      list = [...list, newWebHook];

      return { ...state, webHooks: list };
    }
    case actionType.SETTING_REMOVE_WEBHOOK: {
      let newWebHooks = state.webHooks.filter(
        (item, index) => index !== action.payload
      );
      return { ...state, webHooks: newWebHooks };
    }
    //Chrome User

    case actionType.SETTING_ADD_CHROMEUSER:
      let list;
      list = state.chromeUsersTwitter;
      list = [...list, action.payload];

      return { ...state, chromeUsersTwitter: list };

    case actionType.SETTING_REMOVE_CHROMEUSER: {
      let newChromeUsers = state.chromeUsersTwitter.filter(
        (item, index) => index !== action.payload
      );
      return { ...state, chromeUsersTwitter: newChromeUsers };
    }

    case actionType.SETTING_EDIT_CHROMEUSER: {
      const newList = state.chromeUsersTwitter.map((token) =>
        token.id === action.payload.id
          ? {
              token: action.payload.value,
            }
          : token
      );
      return { ...state, chromeUsersTwitter: newList };
    }

    case actionType.DELETE_ACCOUNT: {
      let newMonitorTokenList = state.monitorTokens.filter(
        (token) => token.id !== action.payload
      );
      return { ...state, monitorTokens: newMonitorTokenList };
    }

    case actionType.SET_WEBHOOK: {
      return { ...state, webhook: action.payload };
    }

    case actionType.TOGGLE_BUTTONS_WEBHOOK: {
      const webHookToggles = state.webHookToggles;
      webHookToggles[action.payload] = !webHookToggles[action.payload];

      return { ...state, webHookToggles };
    }
    case actionType.FETCH_TWEETS: {
      let list;
      list = state.tweets;
      if (action.payload === "") {
        return { ...state, tweets: list };
      } else {
        const { id_str, created_at, text, user } = action.payload;
        const newTweet = {
          id_str,
          created_at,
          text,
          user,
        };

        list = [newTweet, ...list];
        return { ...state, tweets: list };
      }
    }

    case actionType.SET_TIMER: {
      return { ...state, timer: 7000 };
    }
    case actionType.CLEAR_LATEST_TWEETS: {
      return { ...state, tweets: [] };
    }

    case actionType.TOGGLE_SWITCH_BUTTON: {
      let current;
      if (state.switch === false) {
        current = true;
      } else {
        current = false;
      }
      return { ...state, switch: current };
    }

    case actionType.STORE_TWEET_INFO: {
      let list;
      list = state.tweets_info;
      if (action.payload === "") {
        return { ...state, tweets_info: list };
      } else {
        list = [action.payload, ...list];
        return { ...state, tweets_info: list };
      }
    }

    case actionType.TOGGLE_JOINER: {
      let current = state.joiner;
      if (current === false) {
        current = true;
      } else {
        current = false;
      }
      return { ...state, joiner: current };
    }

    case actionType.TOGGLE_OPENER: {
      let current = state.opener;
      if (current === false) {
        current = true;
      } else {
        current = false;
      }
      return { ...state, opener: current };
    }

    case actionType.ADD_FEATURED_TWEET: {
      let list;
      list = state.featuredTweets;
      if (action.payload.newTweet === "") {
        return { ...state, featuredTweets: list };
      } else {
        const obj = {
          text: action.payload.newTweet,
          type: action.payload.featureType,
          originalName: action.payload.originalText,
          name: action.payload.name,
        };

        list = [...list, obj];
        return { ...state, featuredTweets: list };
      }
    }

    case actionType.CLEAR_FEATURED_TWEETS: {
      return { ...state, featuredTweets: [], tweets_info: [] };
    }

    case actionType.KEYWORD_DISCORD: {
      const { addOrDelete, keyword } = action.payload;
      let list;

      if (addOrDelete) {
        // true means add
        list = state.keywords_discord;
        list = [...list, keyword];
      } //delete
      else list = state.keywords_discord.filter((key) => key !== keyword);

      return { ...state, keywords_discord: list };
    }

    case actionType.SET_DELAY: {
      return { ...state, delay: action.payload };
    }

    case actionType.TOGGLE_LINK_OPENER:
      return {
        ...state,
        start: { ...state.start, linkOpener: action.payload },
      };

    case actionType.TOGGLE_INVITE_JOINER: {
      let val = state.start.inviteJoiner;
      return { ...state, start: { ...state.start, inviteJoiner: !val } };
    }

    case actionType.HANDLE_CHECKBOX: {
      const boxType = action.payload;
      const val = !state.options.boxType;

      if (boxType === "sound")
        return { ...state, options: { ...state.options, sound: val } };
      else if (boxType === "invite")
        return { ...state, options: { ...state.options, invite: val } };
      else if (boxType === "twitter")
        return { ...state, options: { ...state.options, twitter: val } };
      break;
    }
    case actionType.SET_URL_APPENDER:
      return { ...state, urlAppenderURL: action.payload };

    case actionType.TOGGLE_URL_APPENDER:
      return { ...state, urlAppenderEnable: !state.urlAppenderEnable };

    case actionType.CREATE_ACCOUNT: {
      let newAccount = {
        name: action.payload.name,
        type: action.payload.type,
        value: action.payload.value,
        id: state.monitorTokens.length + 1,
      };
      return {
        ...state,
        monitorTokens: [...state.monitorTokens, newAccount],
      };
    }
    case actionType.EDIT_ACCOUNT: {
      const newList = state.monitorTokens.map((token) =>
        token.id === action.payload.id
          ? {
              ...token,
              name: action.payload.name,
              type: action.payload.type,
              value: action.payload.value,
              id: action.payload.id,
            }
          : token
      );
      return { ...state, monitorTokens: newList };
    }

    case actionType.SET_BACKGROUND_ANIMATION:
      return { ...state, backgroundAnimations: !state.backgroundAnimations };

    case actionType.CREATE_CHROME_USER_DISCORD: {
      let userlist = state.chromeUsersDiscord;
      let newUser = {
        id: userlist.length,
        name: action.payload,
        toggleOnOff: false,
      };
      userlist = [...userlist, newUser];
      return { ...state, chromeUsersDiscord: userlist };
    }

    case actionType.DELETE_CHROME_USER_DISCORD: {
      let newUsers = state.chromeUsersDiscord.filter(
        (user) => user.id !== action.payload
      );
      return { ...state, chromeUsersDiscord: newUsers };
    }
    case actionType.SELECT_CHROME_PROFILE: {
     return {...state, selectedChromeProfiles : action.payload}
    }

    case actionType.UNSELECT_CHROME_PROFILE: {
      let newList = state.selectedChromeProfiles.filter(
        (user) => user.id !== action.payload
      );
      return { ...state, selectedChromeProfiles: newList };
    }

    case actionType.CLEAR_LOGS:
      return { ...state, logs: [] };

    case actionType.SELECT_MONITOR_TOKEN_LO:
      return { ...state, selectedMonitorToken_LO: action.payload };

    case actionType.SELECT_MONITOR_TOKEN_IJ:
      return { ...state, selectedMonitorToken_IJ: action.payload };

    case actionType.SELECT_CLAIMER_TOKEN_IJ:
      return { ...state, selectedClaimerToken_IJ: action.payload };

    case actionType.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.payload.val,
        loadingMessage: action.payload.message,
      };
    case actionType.LOGIN_USER: {
      return { ...state, user: action.payload };
    }

    case actionType.ADD_TO_LOGS:
      return { ...state, logs: [...state.logs, action.payload] };

    case actionType.LOGOUT_USER: {
      return { ...state, user: null };
    }

    case actionType.SHOW_USER_PROFILE:
      return { ...state, showUserProfileModal: action.payload };

    case actionType.ADD_CHANNEL_NAME: {
      if (action.payload.type === "LO") {
        return {
          ...state,
          channelidWithNameLO: [
            ...state.channelidWithNameLO,
            { name: action.payload.name, id: action.payload.id },
          ],
        };
      } else if (action.payload.type === "IJ")
        return {
          ...state,
          channelidWithNameIJ: [
            ...state.channelidWithNameIJ,
            { name: action.payload.name, id: action.payload.id },
          ],
        };
      break;
    }

    default:
      return state;
  }
};
