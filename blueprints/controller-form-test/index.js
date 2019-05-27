'use strict';

module.exports = {
  description: 'Override this blueprint with an specific blueprint for controller form tests in your app',

  afterInstall(options) {
    const otherBlueprint = this.lookupBlueprint('controller-test');

    return otherBlueprint.install(options);
  },

  afterUninstall(options) {
    const otherBlueprint = this.lookupBlueprint('controller-test');

    return otherBlueprint.uninstall(options);
  },
};
