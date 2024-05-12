import path from "path";
import { app, ipcMain, Menu, protocol } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = log;
log.info("App starting...");
let template = [];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about",
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click() {
          app.quit();
        },
      },
    ],
  });
}

const isProd = process.env.NODE_ENV === "production";
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);
if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  //  app.dock.setMenu(dockMenu);
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "ressources/", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      spellcheck: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  autoUpdater.on("checking-for-update", () => {
    mainWindow.webContents.send("message", "Checking for update...");
  });
  autoUpdater.on("update-available", (info) => {
    mainWindow.webContents.send("message", info);
  });
  autoUpdater.on("update-not-available", (info) => {
    mainWindow.webContents.send("message", info);
  });
  autoUpdater.on("error", (err) => {
    mainWindow.webContents.send("message", err);
  });
  autoUpdater.on("download-progress", (progressObj) => {
    mainWindow.webContents.send("message", progressObj);
  });
  autoUpdater.on("update-downloaded", (info) => {
    mainWindow.webContents.send("message", info);
    autoUpdater.quitAndInstall();
  });

  if (isProd) {
    await mainWindow.loadURL("app://./forms_interventions");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/forms_interventions`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("ready", async function () {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
