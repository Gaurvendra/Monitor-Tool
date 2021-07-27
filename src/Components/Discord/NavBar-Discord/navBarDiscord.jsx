import React, { useState, useEffect } from "react";
import LinkOpener from "../LinkOpener/linkOpener";
import InviteJoiner from "../InviteJoiner/inviteJoiner";
import Settings from "../Settings/settings";
import Accounts from "../Accounts/accounts";
import "./navbarDiscord.css";
import ProfileDropDown from "../../Profile-dropdown/profileDropDown";
import Loading from "../../Loading/loading";
import UserProfileModal from "../../Profile-dropdown/userProfileModal/userProfileModal";
import { addToLogs, addChannelNameFromId } from "../../../Redux/Actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import utils from "../../../Utils/utils";
import handleWebhook from "../../../Utils/handleWebhook";
const { ipcRenderer } = window.require("electron");
const open = window.require("open");
const FontAwesome = require("react-fontawesome");
const { Client } = window.require("discord.js");

const NavBarDiscord = () => {
  const [tab, setTab] = useState(0);
  const [startLO, setStartLO] = useState(true);
  const [startIJ, setStartIJ] = useState(true);
  const dispatch = useDispatch();
  let monitor = new Client();
  let invite = new Client();

  const {
    keywords_discord,
    channelIdListLinkOpener,
    selectedMonitorToken_LO,
    channelIdListInviteJoiner,
    selectedMonitorToken_IJ,
    options,
    selectedChromeProfiles,
    webhook,
    safeMode,
    delay,
    /* logs,
    /* logs,
    webHookToggles,
    chromeUsersDiscord,
    monitorTokens,
    start,
     */
    selectedClaimerToken_IJ,
  } = useSelector((state) => state);

  const handleTab = () => {
    if (tab === 0)
      return <LinkOpener startLO={startLO} setStartLO={setStartLO} />;
    else if (tab === 1)
      return <InviteJoiner startIJ={startIJ} setStartIJ={setStartIJ} />;
    else if (tab === 2) return <Accounts />;
    return <Settings />;
  };

  //this useEffect is for link opener
  useEffect(() => {
    try {
      monitor.on("ready", () => {
        console.log("Ready", monitor);
        handleWebhook(webhook, monitor.user.username ,"Logged in.", safeMode, delay)
        
      });

      monitor.on("message", async (message) => {
        let content = message.content;
        if (channelIdListLinkOpener.includes(message.channel.id)) {
          console.log("channel id matched");

          //validating url
          let regex =
            /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

          if (regex.test(content)) {
            console.log("url validated");

            let flag = false;
            for (let i = 0; i < keywords_discord.length; i++)
              if (content.includes(keywords_discord[i])) {
                console.log(
                  `keyword = ${keywords_discord[i]}, content =${content}`
                );
                flag = true;
                console.log("keyword matched");
                break;
              }

            // ignore twitter link if ignore twitter option is set to true
            if (options.twitter && utils.isTwitterLink(content)) flag = false;
            // ignore discord invite link if ignore discord invite option is set to true
            if (options.discord && utils.isDiscordInvite(content)) flag = false;
            
            //setting channel name
            dispatch(addChannelNameFromId(message.channel.id, message.channel.name, "LO"));

            if (keywords_discord.length === 0 || flag) {
              let currentTime = new Date();
              dispatch(
                addToLogs(
                  `${content} - ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
                )
              );
              console.log(selectedChromeProfiles);
              await open(content, {
                app: [
                  "google chrome",
                  `--profile-directory=${selectedChromeProfiles}`,
                ],
              });
              //window.open(content);
            }
          }
        }
      });

      if (!startLO) {
        monitor.login(selectedMonitorToken_LO);

        //handleWebhook(monitor.user);
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      monitor.destroy();
    };
  }, [startLO]);

  // this useEffect is for invite joiner
  useEffect(() => {
    try {
      invite.on("ready", () => {
        console.log("Invite Joiner Ready");
      });

      invite.on("message", async (message) => {
        let content = message.content;
        if (channelIdListInviteJoiner.includes(message.channel.id)) {
          //validating url
          let inviteCheck = content.match(
            /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
          );
          if (inviteCheck) {
            let inviteCode = content.split("/").pop();
            let res = await axios.get(
              `https://discordapp.com/api/v9/invites/${inviteCode}`
            );

            function discordAPI(
              authToken,
              apiEndpoint,
              JSONparams,
              type = "GET"
            ) {
              var xhr = new XMLHttpRequest();
              xhr.open(
                type,
                "https://discordapp.com/api/v9" + apiEndpoint,
                true
              );
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.setRequestHeader("Authorization", authToken);
              xhr.send(JSON.stringify(JSONparams));
            }

            discordAPI(
              selectedClaimerToken_IJ,
              `/invites/${inviteCode}`,
              "",
              "POST"
            );
            dispatch(addChannelNameFromId(message.channel.id, message.channel.name, "IJ"));
            dispatch(
              addToLogs(
                `Added to channel : ${
                  res.data.guild.name
                } - ${new Date().toDateString()}`
              )
            );
                
          }
        }
      });

      if (!startIJ) {
        invite.login(selectedMonitorToken_IJ);
        //handleWebhook(invite.user);
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      invite.destroy();
    };
  }, [startIJ]);

  const navLinkList = [
    {
      index: 0,
      classs: "external-link-square-alt",
      name: "external-link-square",
      title: "LINK OPENER",
    },
    { index: 1, classs: "sign-in", name: "sign-in", title: "INVITE JOINER" },
    { index: 2, classs: "database", name: "database", title: "ACCOUNT" },
    { index: 3, classs: "cog", name: "cog", title: "SETTINGS" },
  ];

  return (
    <div style={{ marginLeft: "40px" }}>
      <Loading />
      <UserProfileModal />
      <div className="discord-navbar">
        <div className="discord-navbar-left">
          {navLinkList.map(({ classs, name, title }, idx) => (
            <div
              key={idx}
              className={`navbar-items ${idx === tab ? "active" : null}`}
              onClick={() => setTab(idx)}
              style={{ padding: "0 8px" }}
            >
              <FontAwesome
                className={`fa-icons-navBar ${classs}`}
                name={name}
              />
              {title}
            </div>
          ))}
        </div>

        <div className="profile-container-discord">
          <ProfileDropDown />
        </div>
        <i
          className="fa fa-window-minimize mini"
          aria-hidden="true"
          onClick={() => ipcRenderer.send("minimize")}
        ></i>
        <i
          className="fa fa-times mini"
          style={{ fontSize: "25px" }}
          onClick={() => ipcRenderer.send("close")}
        ></i>
      </div>
      {handleTab()}
    </div>
  );
};
export default NavBarDiscord;
