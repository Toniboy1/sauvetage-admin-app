import path from "path";
import { app, ipcMain, protocol } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

// const dockMenu = Menu.buildFromTemplate([
//   {
//     label: "Créer Nouveau Rapport d'intervention",
//     click () { app = "/intervention"; }
//   }
// ])


const isProd = process.env.NODE_ENV === "production";
protocol.registerSchemesAsPrivileged([
  { scheme: 'http', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
  { scheme: 'https', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
  { scheme: 'mailto', privileges: { standard: true } },
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
    icon: path.join(__dirname,"ressources/", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      spellcheck: true
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./forms_interventions");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/forms_interventions`);
    mainWindow.webContents.openDevTools();
  }
})();
app.on("ready", async function () {});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
