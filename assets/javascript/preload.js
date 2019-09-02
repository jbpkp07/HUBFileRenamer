"use strict";
/* global require, process */

const webFrame = require('electron').webFrame;

const HubFileRenamerConfig = require('./classes/HubFileRenamerConfig.js');


window.onload = () => {

    configureHTMLDoc();

    preventZoom();

    consoleLogAppInfo();
};


function configureHTMLDoc() {

    const $ = require('jquery');  //must be required after window is ready (relies on browser 'window' and 'document' objects)
    
    const config = new HubFileRenamerConfig();

    const resetCSSElement = $("#resetCSS");

    const styleCSSElement = $("#styleCSS");

    const viewControllerElement = $("#ViewControllerJS");

    $(resetCSSElement).attr("href", config.resetCSSPath);

    $(styleCSSElement).attr("href", config.styleCSSPath);

    $(viewControllerElement).attr("src", config.viewControllerJSPath);
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