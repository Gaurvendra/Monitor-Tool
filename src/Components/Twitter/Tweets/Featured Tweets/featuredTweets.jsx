import React from "react";
import "./featuredTweets.css";
import { useSelector, useDispatch } from "react-redux";
import { clearFeaturedTweets } from "../../../../Redux/Actions/actionCreator";

const FeaturedTweets = () => {
  const data = useSelector((state) => state.featuredTweets);

  const dispatch = useDispatch();
  return (
    <div className="common-container">
      <div className="row-container-tweets">
        <label className="main-label">Featured Tweets</label>
        <button
          className="clear-button"
          onClick={() => dispatch(clearFeaturedTweets())}
        >
          Clear
        </button>
      </div>
      <div className="featured-tweet-container">
        {data.map((tweet, i) => (
          <div className="tweets" key={tweet.id}>
            <div className="row-container-user">
              <h4>{tweet.type} tweet from</h4>
              <h4 className="day">Sat</h4>
              <h4 className="date">June 19</h4>
              <h4 className="time">10:00</h4>
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
              {tweet.name}
            </h4>
            <h3>{tweet.text}</h3>
            <div className="row-container-user" id="tweet-options">
              <button className="btn-webhook" id="download">
                Tweet
              </button>
              <button className="btn-webhook" id="download">
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
              <button className="btn-webhook" id="download">
                View Following
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTweets;
