"use strict";
/* global ViewController */

const intervalID = setInterval(() => {

    const requirements = [];

    requirements.push(typeof $ !== 'undefined');
    requirements.push(typeof Utility !== 'undefined');
    requirements.push(typeof ViewController !== 'undefined');

    if (requirements.every(req => req === true)) {

        clearInterval(intervalID);

        $(document).ready(() => {

            const viewController = new ViewController();
        });
    }

}, 10);