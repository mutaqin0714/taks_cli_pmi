const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('$0 <port>', 'start the application server', (yargs) => {
    yargs.positional('port', {
      describe: 'the port that your application should bind to',
      type: 'number'
    })
  }).argv