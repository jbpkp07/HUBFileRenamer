"use strict";
/* global require, module */

const BrowserWindow = require('electron').BrowserWindow;


class AppWindow extends BrowserWindow {

    constructor(windowConfigOBJ, htmlPath, openDevTools) {

        super(windowConfigOBJ);

        this.focusOpacity = 1.0;

        this.blurOpacity = 0.75;

        this.showDurationMS = 500;

        this.fadeToDurationMS = 250;

        this.intervalID = null;

        this.loadHTMLFile(htmlPath, openDevTools);
    }

    loadHTMLFile(htmlPath, openDevTools) {

        this.loadFile(htmlPath);

        if (openDevTools) {

            this.webContents.openDevTools();
        }

        this.assignShowListener();
    }

    assignShowListener() {

        this.once('ready-to-show', () => {

            setTimeout(() => {

                this.show();

                this.fadeTo(this.focusOpacity, this.showDurationMS).then(() => {
    
                    this.assignOnFocusListener();
    
                    this.assignOnBlurListener();
                });

            }, 250);  //slight delay helps with reducing flickering when showing window upon app start

        });
    }

    assignOnFocusListener() {

        this.on('focus', () => {

            clearInterval(this.intervalID);

            this.fadeTo(this.focusOpacity, this.fadeToDurationMS);
        });
    }

    assignOnBlurListener() {

        this.on('blur', () => {

            clearInterval(this.intervalID);

            this.fadeTo(this.blurOpacity, this.fadeToDurationMS);
        });
    }

    fadeTo(newOpacity, ms) {

        let opacity = this.getOpacity();

        let isIncreasing = false;

        if (opacity < newOpacity) { isIncreasing = true; }

        if (ms < 10) { ms = 10; }

        let step = (Math.abs(newOpacity - opacity)) / (ms / 10) * 1.05;

        return new Promise((resolve) => {

            this.intervalID = setInterval(() => {

                if (isIncreasing) {

                    opacity += step;

                    if (opacity >= newOpacity) {

                        opacity = newOpacity;

                        clearInterval(this.intervalID);

                        resolve();
                    }
                }
                else {

                    opacity -= step;

                    if (opacity <= newOpacity) {

                        opacity = newOpacity;

                        clearInterval(this.intervalID);

                        resolve();
                    }
                }

                this.setOpacity(opacity);

            }, 10);
        });
    }

    closeGracefully() {

        clearInterval(this.intervalID);

        this.fadeTo(0.0, this.fadeToDurationMS).then(() => {

            this.close();
        });
    }
}


module.exports = AppWindow;