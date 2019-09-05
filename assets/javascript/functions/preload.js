"use strict";
/* global require, process */

const webFrame = require('electron').webFrame;

const HubFileRenamerConfig = require('../classes/HubFileRenamerConfig.js');


window.onload = () => {

    configureHTMLDoc();

    preventZoom();

    consoleLogAppInfo();
};


function configureHTMLDoc() {

    const $ = require('jquery');  //must be required after window is ready (relies on browser 'window' and 'document' objects)
    
    const config = new HubFileRenamerConfig();

    $("#resetCSS").attr("href", config.resetCSSPath);

    $("#styleCSS").attr("href", config.styleCSSPath);

    $("#requireJquery").attr("src", config.requireJqueryJSPath);

    $("#utilityJS").attr("src", config.utilityJSPath);

    $("#viewControllerJS").attr("src", config.viewControllerJSPath);

    $("#startViewController").attr("src", config.startViewControllerJSPath);
}


function preventZoom() {

    webFrame.setVisualZoomLevelLimits(1, 1);

    webFrame.setLayoutZoomLevelLimits(0, 0);
}


function consoleLogAppInfo() {

    console.log("HUB File Renamer app started...");

    for (const type of ['chrome', 'node', 'electron']) {

        console.log(type + " version:  " + process.versions[type]);
    }
}