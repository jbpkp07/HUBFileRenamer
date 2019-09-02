"use strict";
/* global require, module */

const remote = require('electron').remote;
const dialog = remote.dialog;

const fs = require('fs');


class ViewController {

    constructor() {

        this.mainWindow = remote.getCurrentWindow();

        this.minimizeBtn = $("#minimizeBtn");
        this.maximizeBtn = $("#maximizeBtn");
        this.closeBtn = $("#closeBtn");

        this.openFileBtn = $("#openFileBtn");

        this.allowInput = true;

        this.filePath = null;

        this.assignListeners();
    }

    assignListeners() {

        this.minimizeBtn.click(() => {

            if (this.allowInput) { this.mainWindow.minimize(); }
        });

        this.maximizeBtn.click(() => {

            if (this.mainWindow.isMaximized()) {

                if (this.allowInput) { this.mainWindow.unmaximize(); }
            }
            else {

                if (this.allowInput) { this.mainWindow.maximize(); }
            }
        });

        this.closeBtn.click(() => {

            if (this.allowInput) { this.mainWindow.closeGracefully(); }
        });

        this.openFileBtn.click(() => {

            if (this.allowInput) { this.openFileDialog(); }
        });
    }

    openFileDialog() {

        this.allowInput = false;

        const options = {

            title: "select hub file asset",
            buttonLabel: "Select File",
            // filters: [
            //   { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            //   { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
            //   { name: 'Custom File Type', extensions: ['as'] },
            //   { name: 'All Files', extensions: ['*'] }
            // ],
            properties: ['openFile']
        };

        // const filePath = dialog.showOpenDialogSync(options);

        // if (typeof filePath !== 'undefined') {

        //     this.filePath = filePath.toString();

        //     console.log(this.filePath);
        // }
        // else {

        //     console.log("No file selected.");
        // }

        dialog.showOpenDialog(options, (filePath) => {

            filePath = filePath.toString();

            if (filePath.length !== 0) {

                if (!fs.existsSync(filePath)) {

                    console.log("File does not exist.");
                }
                else {

                    this.filePath = filePath;

                    console.log("Exists at:  " + this.filePath);
                }
            }
            else {

                console.log("No file selected.");
            }

            this.allowInput = true;
        });
    }
}


module.exports = ViewController;

dispatchEvent(new CustomEvent("ViewControllerJS-defined"));