"use strict";
/* global require, process, __dirname, module */

const HubFileRenamerConfig = require('./HubFileRenamerConfig.js');
const config = new HubFileRenamerConfig();

const AppWindow = require(config.appWindowJSPath);


class HubFileRenamer {

    constructor() {

        this.app = require('electron').app;

        this.mainWindow = null;
    }

    startElectronApp() {

        console.log("Electron App Started...");

        this.assignAppEventListners();
    }

    assignAppEventListners() {

        this.app.on('ready', () => {

            this.createMainWindow();
        });

        this.app.on('window-all-closed', () => {

            if (config.platform !== 'darwin') {

                this.app.quit();
            }
        });

        this.app.on('activate', () => {

            if (this.mainWindow === null) {

                this.createMainWindow();
            }
        });
    }

    createMainWindow() {

        this.mainWindow = new AppWindow(config.mainWindowConfigOBJ, config.indexHTMLPath, config.openDevTools);

        this.assignMainWindowClosedListener();
    }

    assignMainWindowClosedListener() {

        this.mainWindow.on('closed', () => { 
            
            this.mainWindow = null; 
        });    
    }
}


module.exports = HubFileRenamer;