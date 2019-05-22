const Blueprint = require('ember-cli/lib/models/blueprint');
const path = require('path');

module.exports = {
  description: 'Override this blueprint with an specific blueprint for controller lists in your app',

  afterInstall(options) {
    const otherBlueprint = this.lookupBlueprint('controller');

    return otherBlueprint.install(options);
  },

  afterUninstall(options) {
    const otherBlueprint = this.lookupBlueprint('controller');

    return otherBlueprint.uninstall(options);
  },
};
