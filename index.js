#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const CONSTANTS = require('./modules/constants');
const reducerGen = require('./modules/reducerGen');
const readAnswers = require('./modules/readAnswers');
const saveAnswers = require('./modules/saveAnswers');

program.version('0.0.1').description('Redux reducer and action boilerplate');

program
  .option('-t, --typescript', 'generate as typescript')
  .option('-s, --save', 'save as project wide generator template')
  .description('Generate reducer')
  .action(() => {
    const preSavedAnswers = readAnswers();
    const questions = preSavedAnswers ? [CONSTANTS.defaultQuestions[0]] : CONSTANTS.defaultQuestions;
    prompt(questions)
      .then(answers => reducerGen(preSavedAnswers ? { ...answers, ...preSavedAnswers } : answers, !!program.typescript))
      .then(answers => {
        if (!!program.save) {
          saveAnswers(answers);
        }
      });
  });

program.parse(process.argv);
