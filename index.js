"use strict";
/* global require */

const HubFileRenamerConfig = require('./assets/javascript/classes/HubFileRenamerConfig.js');
const config = new HubFileRenamerConfig();

const HubFileRenamer = require(config.hubFileRenamerJSPath);
const hubFileRenamer = new HubFileRenamer();

hubFileRenamer.startElectronApp();