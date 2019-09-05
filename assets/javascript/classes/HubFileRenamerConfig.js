"use strict";
/* global require, __dirname, module, process */

const path = require('path');


class HubFileRenamerConfig {

    constructor() {

        this.openDevTools = false;
        this.platform = process.platform;

        this.assetsPath = this.getAssetsDirectoryPath();

        //Electron app config section------------------------------------------
        this.hubFileRenamerJSPath = path.join(this.assetsPath, "javascript/classes/HubFileRenamer.js");
        this.appWindowJSPath = path.join(this.assetsPath, "javascript/classes/AppWindow.js");
        this.utilityJSPath = path.join(this.assetsPath, "javascript/classes/Utility.js");
        this.indexHTMLPath = path.join(this.assetsPath, "html/index.html");

        //Preload web config section-------------------------------------------
        this.preloadJSPath = path.join(this.assetsPath, "javascript/functions/preload.js");
        this.resetCSSPath = path.join(this.assetsPath, "css/reset.css");
        this.styleCSSPath = path.join(this.assetsPath, "css/style.css");
        this.requireJqueryJSPath = path.join(this.assetsPath, "javascript/functions/requireJquery.js");
        this.viewControllerJSPath = path.join(this.assetsPath, "javascript/classes/ViewController.js");
        this.startViewControllerJSPath = path.join(this.assetsPath, "javascript/functions/startViewController.js");

        //Electron app window config-------------------------------------------
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
            devTools: this.openDevTools,
            zoomFactor: 1.0,
            opacity: 0.0,
            width: 1680,
            height: 1050,
            show: false,
            darkTheme: true,
            autoHideMenuBar: true,
            frame: false,
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