'use strict';

const Homey = require('homey');

module.exports = class SonyApp extends Homey.App {

	onInit() {
		this.log('Sony TV IR is running...');
	}

}