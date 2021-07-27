/**
 * Initial-State module
 * @module Initial-State
 */

/**
 * @file initialState.js contains the object for initializing the the redux global state
 * @author Vibhor
 */

/**
 * Initial State
 * @type {Object} initialState
 */

export const initialState = {
  monitorTokens: [],
  selectedMonitorToken_LO: "",
  selectedMonitorToken_IJ: "",
  selectedClaimerToken_IJ: "",
  delay: 600,
  safeMode: true,
  //url: "",
  channelIdListLinkOpener: [],
  channelidWithNameLO: [],
  channelidWithNameIJ: [],

  channelIdListInviteJoiner: [],
  //selectedChannelId : '',
  keywords_twitter: [],
  keywords_discord: [],
  users_twitter: [],
  featuredTweets: [],
  keys: [],
  timer: 5000,
  tweets: [],
  claimerToken: "",
  webHooks: [],
  joiner: false,
  opener: false,
  switch: false,
  currentTChromeUser: "Default",
  tweets_info: [],
  chromeUsersTwitter: [],
  urlAppenderEnable: false,
  urlAppenderURL: "",
  options: {
    twitter: false,
    invite: false,
    sound: false,
  },

  start: {
    linkOpener: false,
    inviteJoiner: false,
  },
  logs: ["[3:52:48 PM] - HelloWorld#6955"],

  //for settings component
  webhook: null,
  webHookToggles: [false, false, false],
  //array elements => linkOpener, inviteJoiner, Logs on/off

  backgroundAnimations: true,
  chromeUsersDiscord: [],
  selectedChromeProfiles: "",
  loading: false,
  loadingMessage: "",
  user: null,
  showUserProfileModal: false,
};
