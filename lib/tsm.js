#!/usr/bin/env node

'use strict'

const fs = require('fs');
const path = require('path');
const editor = require('editors');
const Promise = require('bluebird');
const systools = require('./systools.js');
const nodemailer = require('nodemailer');

let rootFolder = null;
let configPath = null;

function printHelp() {
  console.log(`
tsm help: opens this help
tsm config: opens the config for editing
tsm run: sends the time-sheet-mails
tsm dryrun: shows you, what mails would be sent, without actually sending them
`);
}

function mail(dryrun) {
  let config = null;
  systools.readJson(configPath)
    .then((json) => {
      config = json;
      if (!config || !config.directory) {
        return Promise.reject();
      }

      return systools.getFileNames(config.directory);
    })
    .then((fileNames) => {
      const projectFiles = {};

      const files = fileNames.filter((file) => {
        return path.extname(file).indexOf('xl') == 1;
      })

      for (let i = 0; i < files.length; i++) {
        for (let j in config.projects) {
          if (files[i].toLowerCase().indexOf(j.toLowerCase()) < 0) {
            continue;
          }

          if (!projectFiles[j]) {
            projectFiles[j] = {
              files: [],
              recipients: []
            };

            for (let k = 0; k < config.projects[j].length; k++) {
              if (config.mailadresses[config.projects[j][k]]) {
                projectFiles[j].recipients.push(config.mailadresses[config.projects[j][k]]);
              }
            }
          }

          projectFiles[j].files.push(files[i]);
        }
      }

      const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        auth: {
          user: config.smtp.username,
          pass: config.smtp.password
        }
      });

      const mails = Object.keys(projectFiles).map((projectName) => {
        return {
          from: config.email.sender,
          to: projectFiles[projectName].recipients.join(', '),
          subject: config.email.subject.replace('$project', projectName),
          attachments: projectFiles[projectName].files.map((fileName) => {
            return {
              path: path.join(config.directory, fileName)
            };
          })
        }
      });

      for (let i = 0; i < mails.length; i++) {
        sendMail(transporter, mails[i], dryrun);
      }
    })
    .catch((error) => {
      console.log('Error loading config', error);
    });
}

function sendMail(transporter, mail, dryrun) {
  console.log(`sending ${mail.subject} to ${mail.to}`)
  if (dryrun) {
    console.log(mail);
    return console.log(`'${mail.subject}' -> ${mail.to}: Success`);
  }

  transporter.sendMail(mail, function(error, info){
    if(error){
      return console.log(`'${mail.subject}' -> ${mail.to}: Failed`, error);
    }

    console.log(`'${mail.subject}' -> ${mail.to}: Success`);
  });
}

function run() {
  const command = process.argv[2];
  if (!command || command == 'help') {
    return printHelp();
  }

  rootFolder = path.join(__dirname, '..');
  configPath = path.join(rootFolder, 'config.json');
  if (command == 'config') {
    return editor(configPath);
  }

  if (command == 'run') {
    return mail();
  }

  if (command == 'dryrun') {
    return mail(true);
  }
}

run();
