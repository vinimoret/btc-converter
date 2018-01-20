#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./convertBTC.js');

program
  .version(pkg.version)
  .description('CLI to convert bitcoin to a provided currency.')
  .option(
    '-C --currency <currency>',
    'Corrency to be converted. (Default: USD)'
  )
  .option(
    '-A --amount <amount>',
    'Amount in Bitcoin to be converted. (Default: 1)'
  )
  .parse(process.argv);

convertBTC(program.currency, program.amount);
