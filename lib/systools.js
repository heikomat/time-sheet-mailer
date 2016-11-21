'use strict';

const fs = require('fs-extra');
const path = require('path');
const Promise = require('bluebird');

const systools = {

  readJson(filePath) {
    return new Promise((resolve, reject) => {
      fs.readJson(filePath, function (err, json) {
        if (err) {
          return reject(err);
        }

        return resolve(json);
      });
    });
  },

  getFileNames(folderPath) {
    return new Promise((resolve, reject) => {

      fs.readdir(folderPath, (error, files) => {
        if (error) {
          if (error.code === 'ENOENT') {
            return resolve([]);
          }

          return reject(error);
        }

        return resolve(Promise.all(files.map((file) => {
          return this.verifyFileName(folderPath, file);
        })));
      });
    })
      .then((fileNames) => {

        return fileNames.filter((fileName) => {
          return fileName != null;
        });
      });
  },

  verifyFileName(filePath, fileName) {
    if (fileName.indexOf('.') === 0) {
      return Promise.resolve(null);
    }

    const file = path.join(filePath, fileName);
    return new Promise((resolve, reject) => {
      fs.stat(file, (error, stats) => {
        if (error) {
          if (error.code === 'ENOENT') {
            return resolve(null);
          }

          return reject(error);
        }

        if (stats.isDirectory()) {
          return resolve(null);
        }

        return resolve(fileName);
      });
    });
  },
};

module.exports = systools;
