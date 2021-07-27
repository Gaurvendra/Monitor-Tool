const { app, BrowserWindow, ipcMain, dialog, clipboard } = require("electron");
const auth = require("./auth");
const { Client } = require("discord.js");
const path = require("path");
const richPresence = require("discord-rich-presence")("798566569155362856");
let win = null;
const redirect_uri = "http://localhost/callback/*";
const fetchTweets = require("./fetchTweets");
let mainWindow = null;

function createAuthWindow() {
  destroyAuthWin();
  win = new BrowserWindow({
    width: 1529,
    height: 766,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
    transparent: true,
    frame: false,
    devTools: false,
  });
  win.loadURL(auth.getAuthenticationURL());
  const {
    session: { webRequest },
  } = win.webContents;
  const filter = {
    urls: [redirect_uri],
  };
  webRequest.onBeforeRequest(filter, async ({ url }) => {
    try {
      await auth.loadTokens(url);
      await auth.login();
      if (!mainWindow) return;
      mainWindow.reload();
      return destroyAuthWin();
    } catch (error) {
      destroyAuthWin();

      const options = {
        type: "question",
        defaultId: 2,
        title: "Login Error",
        message: "Login Failed",
        detail: "You are not allowed to login",
      };
      dialog.showMessageBox(null, options, (response, checkboxChecked) => {});
    }
  });
  win.on("authenticated", () => {
    destroyAuthWin();
  });
  win.on("closed", () => {
    win = null;
  });
}
function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}
function createWindow() {
  try {
    richPresence.updatePresence({
      details: "Eliminating The Rest",
      state: `V${app.getVersion()}`,
      startTimestamp: Date.now(),
      largeImageKey: "logo",
      largeImageText: "@getcrystylmini",
      smallImageKey: "hearteyes",
      smallImageText: "Crystyl TOOLS",
      instance: true,
      buttons: [
        { label: "TWITTER", url: "https://twitter.com/getcrystylmini" },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
  mainWindow = new BrowserWindow({
    width: 1340,
    height: 800,
    resizable: true,
    frame: false,
    backgroundColor: "var(--first)",
    icon: path.resolve(__dirname, "img", "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    },
  });

  mainWindow.webContents.openDevTools();

  const StartUrl =
    process.env.url ||
    `file://${path.join(__dirname, "../../build/index.html")}`;
  mainWindow.loadURL("http://localhost:3000/");

  // for (let i = 0; i < 100; i++) {
  //     setTimeout(() => {
  //         mainWindow.webContents.send("message", i);
  //     }, i * 3000);
  // }
}

ipcMain.handle("imageText", async (event, url) => {
  const {
    data: { text },
  } = await Tesseract.recognize(url, "eng");
  return text;
});
ipcMain.on("minimize", (evt, arg) => {
  mainWindow.minimize();
});
ipcMain.on("close", (evt, arg) => {
  mainWindow.close();
});

let server = null;
const isWin = process.platform === "win32";
if (isWin) {
  server = "http://161.97.112.22:8081/windows/";
} else {
  server = "http://161.97.112.22:8081/mac/";
}

const sendStatusToWindow = (text) => {
  if (mainWindow) {
    mainWindow.webContents.send("message", text);
  }
};

ipcMain.handle("get-user", (event, arg) => {
  return auth.getCurrentUser();
});
ipcMain.on("logout", (event, arg) => {
  auth.logout();
});
ipcMain.on("auth", (event, arg) => {
  createAuthWindow();
});

ipcMain.on("minimize", (evt, arg) => {
  mainWindow.minimize();
});
ipcMain.on("close", (evt, arg) => {
  mainWindow = null;
});
ipcMain.handle("fetchTweets", async (event, cKey, cSecret, target) => {
  return await fetchTweets(cKey, cSecret, target);
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", function () {
  app.quit();
});
