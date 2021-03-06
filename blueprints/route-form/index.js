const Blueprint = require('ember-cli/lib/models/blueprint');
const path = require('path');

module.exports = {
  description: 'Override this blueprint with an specific blueprint for route forms in your app',

  afterInstall(options) {
    const otherBlueprint = this.lookupBlueprint('route');

    return otherBlueprint.install(options);
  },

  afterUninstall(options) {
    const otherBlueprint = this.lookupBlueprint('route');

    return otherBlueprint.uninstall(options);
  },
};
