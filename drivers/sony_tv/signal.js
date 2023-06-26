const { RFSignal } = require('homey-rfdriver');

module.exports = class extends RFSignal {
  static FREQUENCY = 'ir';
  static ID = 'sony_prontohex';
}
