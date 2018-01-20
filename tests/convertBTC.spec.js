const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const convertBTC = require('../src/convertBTC.js');
const chalk = require('chalk');

chai.use(sinonChai);

describe('convertBTC', () => {
  let consoleStub;

  const responseMock = {
    price: 12897.97,
    success: true,
    time: '2018-01-20 19:35:40'
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should return USD as currency default and 1 as amount default', done => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        `${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(
          12897.97
        )}`
      );
      done();
    }, 300);
  });

  it('should use USD as currency default and 10 as amount ', done => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        `${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(
          12897.97
        )}`
      );
      done();
    }, 300);
  });

  it('should use BLR as currency  and 1 as amount default', done => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        `${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(
          12897.97
        )}`
      );
      done();
    }, 300);
  });

  it('should message user when api reply with error', done => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        chalk.red('Somethin went wrong in the API. try in a few minutes')
      );
      done();
    }, 300);
  });
});
