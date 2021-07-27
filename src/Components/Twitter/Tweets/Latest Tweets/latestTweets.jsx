import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import utils from "../../../../config/utils";
import "./latestTweets.css";
import {
  addFeaturedTweet,
  clearLatestTweets,
} from "../../../../Redux/Actions/actionCreator";
import scanner from "../Featured Tweets/featureScanner";
import { toast } from "react-toastify";
const open = window.require("open");
const LatestTweets = () => {
  const data = useSelector((state) => state.tweets);
  const tweet_info = useSelector((state) => state.tweets_info);
  const featuredTweets = useSelector((state) => state.featuredTweets);
  const keyWords = useSelector((state) => state.keywords_twitter);
  const joiner = useSelector((state) => state.joiner);
  const opener = useSelector((state) => state.opener);
  const webhooks = useSelector((state) => state.webHooks);
  const token = useSelector((state) => state.claimerToken);
  const currentUser = useSelector((state) => state.currentTChromeUser);
  const dispatch = useDispatch();

  tweet_info.forEach(async (tweet) => {
    if (featuredTweets.some((item) => item.originalName === tweet.text)) {
      return;
    }

    const featured = await scanner(tweet, keyWords, webhooks, true);
    //Invite joiner or opener extraction code goes here.
    if (featured.featured_type) {
      var text = "";
      if (featured.featured_type === "Binary") {
        text = featured.binaryText;
      } else if (featured.featured_type === "Base64") {
        text = featured.base64Text;
      } else if (featured.featured_type === "Maths") {
        text = featured.mathSolved;
      } else if (featured.featured_type === "Pastebin") {
        text = featured.pastebinText.toString();
      } else if (featured.featured_type === "URLs extracted") {
        text = featured.urlsExtracted;
      }
      else if (featured.featured_type === "QR") {
        text = featured.qrText.toString();
    } else if (featured.featured_type === "OCR") {
        text = featured.ocrText.toString();
    }
      dispatch(
        addFeaturedTweet(
          text[0],
          featured.featured_type,
          featured.text,
          featured.user.screen_name
        )
      );
      console.log('featured =',featured);
      if (featured.urlsExtracted) {
        for (let url of featured.urlsExtracted) {
          console.log("URl = ", url);
          let inviteCode = utils.isDiscordInvite(url);
          console.log("invite code = ", inviteCode);
          if (inviteCode) {
            if (joiner) {
              let info = await axios.post(
                `https://discordapp.com/api/v9/invites/${inviteCode}`,
                {},
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (info.status === 200) {
                toast.success(`Successfully Joined `);
              } else {
                toast.error(`Failed to join ${url}`);
              }
            }
          } else {
            if (opener) {
              window.open(url, {
                app: ["chrome", `--profile-directory=${currentUser}`],
              });
            }
          }
        }
      }
    }
  });

  return (
    <div className="common-container">
      <div className="row-container-tweets">
        <label className="main-label">Latest Tweets</label>
        <button
          className="clear-button"
          onClick={() => dispatch(clearLatestTweets())}
        >
          Clear
        </button>
      </div>
      <div className="tweets-container">
        {data.map((item, i) => (
          <div className="tweets">
            <div className="row-container-user" key={i}>
              <h4>New Tweets From</h4>
              <h4 className="day">{item.created_at}</h4>
            </div>
            <h4 className="username">
              <i
                style={{
                  position: "relative",
                  padding: "2px ",
                  marginLeft: "3px",
                  marginRight: "2px",
                  top: "2px",
                }}
                className="fa fa-twitter"
              ></i>
              {item.user.screen_name}
            </h4>
            <h3>{item.text}</h3>
            <div className="row-container-user" id="tweet-options">
              <button
                className="btn-webhook"
                id="download"
                onClick={() =>
                  open(
                    `https://twitter.com/${item.user.screen_name}/status/${item.id_str}`
                  )
                }
              >
                Tweet
              </button>
              <button
                className="btn-webhook"
                id="download"
                onClick={() =>
                  open(`https://twitter.com/${item.user.screen_name}`)
                }
              >
                <i
                  style={{
                    position: "relative",
                    padding: "2px ",
                    marginLeft: "3px",
                    marginRight: "2px",
                    top: "2px",
                  }}
                  className="fa fa-address-card"
                ></i>
                View Profile
              </button>

              <button
                className="btn-webhook"
                id="download"
                onClick={() =>
                  open(`https://twitter.com/${item.user.screen_name}/following`)
                }
              >
                View Following
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTweets;
