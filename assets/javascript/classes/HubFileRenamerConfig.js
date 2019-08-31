"use strict";
/* global require, __dirname, module, process */

const path = require('path');


class HubFileRenamerConfig {

    constructor() {

        this.openDevTools = true;

        this.platform = process.platform;

        this.assetsPath = this.getAssetsDirectoryPath();

        this.hubFileRenamerJSPath = path.join(this.assetsPath, "javascript/classes/HubFileRenamer.js");

        this.appWindowJSPath = path.join(this.assetsPath, "javascript/classes/AppWindow.js");
        
        this.preloadJSPath = path.join(this.assetsPath, "javascript/preload.js");

        this.indexHTMLPath = path.join(this.assetsPath, "html/index.html");

        this.mainWindowConfigOBJ = this.getMainWindowConfigOBJ();
    }

    getAssetsDirectoryPath() {

        let assetsPath = __dirname;

        while (true) {

            if (path.basename(assetsPath) === "assets") {

                break;
            }
            else {

                assetsPath = path.dirname(assetsPath);
            }
        }

        return assetsPath;
    }

    getMainWindowConfigOBJ() {

        const configOBJ =
        {
            width: 1680,
            height: 1050,
            show: false,
            darkTheme: true,
            autoHideMenuBar: true,
            // frame: false,
            webPreferences:
            {
                nodeIntegration: true,
                preload: this.preloadJSPath
            }
        };

        return configOBJ;
    }
}


module.exports = HubFileRenamerConfig;