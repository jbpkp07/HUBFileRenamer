"use strict";
/* global require, module */

const dialog = require('electron').remote.dialog;


class ViewController {

    constructor() {

        this.openFileBTN = $("#openFileBTN");

        this.filePath = null;

        this.assignListeners();
    }

    assignListeners() {

        this.openFileBTN.click(() => {

            this.openFileDialog();
        });
    }

    openFileDialog() {

        const options = {

            title: "Select HUB File Asset",
            buttonLabel: "Select File",
            // filters: [
            //   { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            //   { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
            //   { name: 'Custom File Type', extensions: ['as'] },
            //   { name: 'All Files', extensions: ['*'] }
            // ],
            properties: ['openFile']
        };

        this.filePath = dialog.showOpenDialogSync(options);

        if (typeof this.filePath !== 'undefined') {

            console.log(this.filePath.toString());
        }
        else {

            console.log("No file selected.");
        }

        // this.dialog.showOpenDialog(this.mainWindow, options, (filePaths) => {
        //     console.log(filePaths.toString());
        // });
    }
}


module.exports = ViewController;