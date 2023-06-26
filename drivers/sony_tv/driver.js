const { RFDriver } = require('homey-rfdriver');
const SignalSony = require('./signal.js');

module.exports = class extends RFDriver {
  static SIGNAL = SignalSony;

  async onRFInit() {
    await super.onRFInit();

    const sendCmdCard = this.homey.flow.getActionCard('sony_tv:send_cmd')
      .registerRunListener(async ({ device, cmd }) => {
        return device.sendCommand({ cmd: cmd.cmd });
      })
      .getArgument('cmd')
      .registerAutocompleteListener(async (query, args) => {
        const signal = await this.getRFSignal();

        return Object.keys(signal.manifest.cmds)
          .map(cmd => {
            return {
              name: this.homey.__(`commands.${cmd}`),
              cmd,
            };
          })
          .filter(command => {
            return command.name.toLowerCase().includes(query.toLowerCase());
          });
      });

    this.homey.flow.getActionCard('sony_tv:send_cmd_number')
      .registerRunListener(async ({ device, number }) => {
        return device.sendCommandNumber({ number });
      });
  }
}
