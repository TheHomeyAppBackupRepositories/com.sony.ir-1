const { RFDevice } = require('homey-rfdriver');

module.exports = class extends RFDevice {
  static CAPABILITIES = {
    onoff: {
      'true': 'POWER_ON',
      'false': 'POWER_OFF',
    },
    channel_up: 'CHANNEL_UP',
    channel_down: 'CHANNEL_DOWN',
    volume_up: 'VOLUME_UP',
    volume_down: 'VOLUME_DOWN',
    volume_mute: 'MUTE_TOGGLE',
  }

  async sendCommand({ cmd }) {
    const signal = await this.driver.getRFSignal();

    await signal.cmd(cmd);
  }

  async sendCommandNumber({ number }) {
    const signal = await this.driver.getRFSignal();
    const numbers = String(number).split('');

    for (const number of numbers) {
      await signal.cmd(`DIGIT_${number}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}
