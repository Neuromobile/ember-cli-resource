/* eslint-env node */
var Promise    = require('rsvp').Promise;
var merge      = require('ember-cli-lodash-subset').merge;
var inflection = require('inflection');

function processRouteName(routeOptions, preffix, suffix) {
  const copyOptions = merge({}, routeOptions);
  const name = copyOptions.entity.name;

  copyOptions.entity.name = `${preffix}/${name}/${suffix}`;

  return copyOptions;
}

module.exports = {
  description: 'Generates CRUD files.',

  availableOptions: [
    {
      name: 'module',
      type: String,
      default: '',
    }
  ],

  install(options) {
    return this._process('install', options);
  },

  uninstall(options) {
    return this._process('uninstall', options);
  },

  _processBlueprint(type, name, options) {
    var mainBlueprint = this.lookupBlueprint(name);

    var that = this;
    return Promise.resolve()
      .then(function() {
        return mainBlueprint[type](options);
      })
      .then(function() {
        var testBlueprint = mainBlueprint.lookupBlueprint(name + '-test', {
          ui: this.ui,
          analytics: this.analytics,
          project: this.project,
          ignoreMissing: true
        });

        if (!testBlueprint) { return; }

        var Blueprint = that._findBlueprintBaseClass(testBlueprint);
        if (Blueprint && testBlueprint.locals === Blueprint.prototype.locals) {
          testBlueprint.locals = function(options) {
            return mainBlueprint.locals(options);
          };
        }

        return testBlueprint[type](options);
      });
  },

  _findBlueprintBaseClass(cls) {
    if (cls.constructor && cls.constructor.name === 'Blueprint') {
      return cls.constructor;
    }

    if (cls._super) {
      return this._findBlueprintBaseClass(cls._super);
    }

    return null;
  },

  _process(type, options) {
    this.ui = options.ui;
    this.project = options.project;
    var entityName = options.entity.name;
    const moduleName = options.module;

    var modelOptions = merge({}, options, {
      entity: {
        name: entityName ? inflection.singularize(entityName) : ''
      }
    });

    var routeOptions = merge({}, options);

    return this._processBlueprint(type, 'model', modelOptions)
              .then(
                function() {
                  return Promise.all([
                    this._processBlueprint(type, 'route', routeOptions),
                    this._processBlueprint(type, 'route', processRouteName(routeOptions, moduleName, 'index')),
                    this._processBlueprint(type, 'route', processRouteName(routeOptions, moduleName, 'edit')),
                    this._processBlueprint(type, 'route', processRouteName(routeOptions, moduleName, 'new')),
                    this._processBlueprint(type, 'route', processRouteName(routeOptions, moduleName, 'show')),
                  ]);
                }
                .bind(this)
              ).then(
                function() {
                  return Promise.all([
                    this._processBlueprint(type, 'controller', routeOptions),
                    this._processBlueprint(type, 'controller', processRouteName(routeOptions, moduleName, 'index')),
                    this._processBlueprint(type, 'controller', processRouteName(routeOptions, moduleName, 'edit')),
                    this._processBlueprint(type, 'controller', processRouteName(routeOptions, moduleName, 'new')),
                    this._processBlueprint(type, 'controller', processRouteName(routeOptions, moduleName, 'show')),
                  ]);
                }.bind(this)
              );
  },
};
