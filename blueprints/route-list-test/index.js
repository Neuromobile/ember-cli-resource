'use strict';

module.exports = {
  description: 'Override this blueprint with an specific blueprint for route lists tests in your app',

  afterInstall(options) {
    const otherBlueprint = this.lookupBlueprint('route-test');

    return otherBlueprint.install(options);
  },

  afterUninstall(options) {
    const otherBlueprint = this.lookupBlueprint('route-test');

    return otherBlueprint.uninstall(options);
  },
};
