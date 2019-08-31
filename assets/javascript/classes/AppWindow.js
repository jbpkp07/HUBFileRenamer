"use strict";
/* global require, module */

const BrowserWindow = require('electron').BrowserWindow;


class AppWindow extends BrowserWindow {

    constructor(windowConfigOBJ, htmlPath, openDevTools) {

        super(windowConfigOBJ);

        this.loadFile(htmlPath);

        if (openDevTools) {

            this.webContents.openDevTools();
        }

        this.once('ready-to-show', () => {

            this.show();
        });
    }
}


module.exports = AppWindow;