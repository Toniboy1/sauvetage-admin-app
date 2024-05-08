import { NsisUpdater, AppImageUpdater, MacUpdater, AppUpdater } from "electron-updater"
import { GithubOptions } from "builder-util-runtime"
// Or MacUpdater, AppImageUpdater

export default class Updater {
    constructor() {
        let autoUpdater: AppUpdater;
        const options: GithubOptions = {
            provider: "github",
            owner:"Toniboy1",
            repo: "sauvetage-admin-app"
        }

        if (process.platform === 'win32') {
            autoUpdater = new NsisUpdater(options);
        } else if (process.platform === 'darwin') {
            autoUpdater = new MacUpdater(options); // Note: OSX apps needs to be signed for auto updates to work.
        } else {
            autoUpdater = new AppImageUpdater(options);
        }
        autoUpdater.checkForUpdatesAndNotify()
    }
}