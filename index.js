#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const CONSTANTS = require('./modules/constants');
const hydrateTemplates = require('./modules/hydrateTemplates');
const exportTemplates = require('./modules/exportTemplates');
const readAnswers = require('./modules/readAnswers');
const readTemplates = require('./modules/readTemplates');
const saveAnswers = require('./modules/saveAnswers');

program.version('2.0.0').description('Customizable redux reducer and action boilerplate');

program
  .option('-t, --typescript', 'generate as typescript')
  .option('-s, --save', 'save your answers for being even faster')
  .option('-e, --export', 'export the default templates')
  .description('Generate reducer')
  .action(() => {
    const preSavedAnswers = readAnswers();
    const overrideTemplates = readTemplates(CONSTANTS.overrideTemplatesPath);
    const questions = preSavedAnswers ? [CONSTANTS.defaultQuestions[0]] : CONSTANTS.defaultQuestions;
    if (!!program.export) {
      exportTemplates(!!program.typescript);
    } else {
      prompt(questions)
        .then(answers =>
          hydrateTemplates(
            preSavedAnswers ? { ...answers, ...preSavedAnswers } : answers,
            !!program.typescript,
            overrideTemplates
          )
        )
        .then(answers => {
          if (!!program.save) {
            saveAnswers(answers);
          }
        })
        .then(() => {
          console.log('*******************************************');
          console.log('Thanks for using rdxgen! For help -> https://github.com/onerzafer/rdxgen');
          const chance = Math.random();
          if (chance <= 0.5) {
            console.log('Hint: -s or --save will save your answers. You will be faster next time. 😉');
          } else {
            console.log('Hint: -e or --export will export the default templates. You can create your own boilerplate with them. 😉');
          }
          console.log('\n');
          console.log("Here's a potato!");
          console.log('🥔');
          console.log('*******************************************');
        });
    }
  });

program.parse(process.argv);
