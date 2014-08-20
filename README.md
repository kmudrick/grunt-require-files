# grunt-require-files

> grunt plugin to generate AMD requires for listed files

I wrote this as a hack to generate a valid javascript source file declaring require() of file-globbed modules which I could load
into a [QUnit](http://qunitjs.com/) test runner that was being run via the [grunt-qunit-istanbul](https://github.com/asciidisco/grunt-qunit-istanbul)
plugin.  The grunt-qunit-istanbul plugin only instruments (for coverage metrics) those source files which were loaded by the 
qunit test runner; therefore if your QUnit test modules did require all of your sources, you would be mislead into thinking you were covering
more than you actually were.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-require-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-require-files');
```

## The "require_files" task

### Overview
In your project's Gruntfile, add a section named `require_files` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  require_files: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.relativeTo
Type: `String`
Default value: `./`

A string value representing a path (to a directory or file), from which the required modules would be relative'ly loaded from.

#### options.callback
Type: `String`
Default value: `''`

A string value representing the callback function that would be invoked when the require()'d modules successfully load.

#### options.extraModules
Type: `Array`
Default value: `[]`

An array of module names to also load.


### Usage Examples

#### Default Options
In this example, we have a test runner at `test/js/tests.html`, source modules in `src/js`, and test specs in `test/js/specs` that end in `Spec.js`.
Additionally, we will require two extra modules: `ModuleA` and `ModuleB`.

```js
grunt.initConfig({
  require_files: {
    options: {
      relativeTo: 'test/js/tests.html'
      callback: 'QUnit.start',
      extraModules: ['ModuleA', 'ModuleB']
    },
    files: {
      'build/test-requires.js': ['src/js/**/*.js', 'test/js/specs/**/*Spec.js'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.0.1 Initial release
* 0.0.2 Add support for extra modules to require

## License
Copyright (c) 2014 Kevin Mudrick. Licensed under the MIT license.
