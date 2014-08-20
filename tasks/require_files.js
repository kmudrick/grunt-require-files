/*
 * grunt-require-files
 * https://github.com/kmudrick/grunt-require-files
 *
 * Copyright (c) 2014 Kevin Mudrick
 * Licensed under the MIT license.
 */

'use strict';
var path = require("path");

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('require_files', 'grunt plugin to generate AMD requires for listed files', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      relativeTo: './',
      callback: ''
    });

    var relativeToPath = path.dirname(options.relativeTo);

    // Start the require & the modules array
    var output = 'require([';

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      output += file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // path needs to be adjusted to be relative to our "relativeTo" path
        var location = path.relative(relativeToPath, filepath);
        // module == js file path minus the extension
        var module = location.replace(/(.*)\.[^.]+$/, "$1");
        return '"' + module + '"';
      }).join(grunt.util.normalizelf(','));

      // Close the modules array, invoke the callback
      output += ']';

      // code in the callback function if specified
      if (options.callback) {
        output += ', ' + options.callback;
      }

      // Close the require() invocation
      output += ');';

      // Write the destination file.
      grunt.file.write(file.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
