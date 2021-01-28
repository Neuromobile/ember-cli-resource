# ember-cli-resource

A set of utils and blueprints for creating CRUD resources.


* `git clone git@github.com:Neuromobile/ember-cli-resource`
* `cd ember-cli-resource`
* `yarn install`

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-resource
```


Usage
------------------------------------------------------------------------------

* Creating a new resource:

```
ember g resource <resource_name>
```

It creates a model called `resource_name` and four routes and controllers:
* <resource_name>/new
* <resource_name>/index
* <resource_name>/edit
* <resource_name>/show

Options:

* `--module String` - it adds a preffix to the resource in case you need to organize your models in different folders/routes.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
