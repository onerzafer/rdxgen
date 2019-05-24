#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const reducerGen = require('./modules/reducerGen');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of new reducer:',
  },
  {
    type: 'input',
    name: 'path',
    message: 'path of store:',
  },
  {
    type: 'input',
    name: 'actions',
    message: 'Enter actions with space saperated:',
  },
  {
    type: 'input',
    name: 'OkSuffix',
    message: 'Success suffix:',
  },
  {
    type: 'input',
    name: 'ErrSuffix',
    message: 'Error suffix:',
  },
];

program.version('0.0.1').description('Redux reducer and action boilerplate');

program
  .command('reducer')
  .alias('r')
  .description('Generate reducer')
  .action(() => {
    prompt(questions).then(answers => reducerGen(answers));
  });

program.parse(process.argv);
