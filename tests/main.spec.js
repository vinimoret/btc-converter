const expect = require('chai').expect;

const exec = require('child_process').exec;
const btcConverter = 'node.exe ./src/main.js';
const pkg = require('../package.json');
describe('Main CLI', () => {
  it('should return version of btc-converver', done => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should be return the description when btc-converter --help', done => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('CLI to convert bitcoin to a provided currency.'))
        .to.be.true;
      done();
    });
  });

  it('should be return currency option when btc-converter --help', done => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });

  it('should be return amount option when btc-converter --help', done => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});
