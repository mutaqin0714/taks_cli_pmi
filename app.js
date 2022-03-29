const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
var ip = require('ip');
const axios = require('axios')
const cherio = require('cheerio')
var superagent = require('superagent');
const capture = require('capture-electron')
const fs = require('fs')
const {
    lowercase,
    uppercase,
    capitalize,
    sum,
    divide,
    multiply,
    substract,
    palindrome,
    obfuscator,
    converts
} = require('./utils')

// usage and help flag
yargs.scriptName("CLI")
yargs.usage("Usage: cli <command>")
yargs.help("h")
yargs.alias("h","help")

function messageOption(yargs) {
    yargs.positional("message", {
        describe: "Inputan Hanya Huruf",
        type: "string"
    })
}

function numberOption(yargs) {
    yargs.positional("number", {
        describe: "Hanya Angka",
        type: "number"
    })
}

yargs(hideBin(process.argv))
.command(
    "lowercase <message>",
    "message to lowercase",
    messageOption,
    lowercase
)
.command(
    "uppercase <message>",
    "message to uppercase",
    messageOption,
    uppercase
)
.command(
    "capitalize <message>",
    "message to capitalize",
    messageOption,
    capitalize
)
.command(
    "add <numbers...>",
    "numbers to add",
    numberOption,
    sum
)
.command(
    "subtract <numbers...>",
    "numbers to subtract",
    numberOption,
    substract
)
.command(
    "multiply <numbers...>",
    "numbers to multipy",
    numberOption,
    multiply
)
.command(
    "divide <numbers...>", 
    "numbers to divide", 
    numberOption, 
    divide
)
.command(
    "palindrome <message>",
    "Message to reverse",
    messageOption,
    palindrome
)
.command(
    "obfuscate <message>",
    "Obfuscator",
    messageOption,
    obfuscator
)
.command('random', 'start the server', (yargs) => {}, async (argv) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var length = 32
    if(argv.length) {
        length = argv.length
    }

    if(argv.letters == 'false') {
        chars = '0123456789'
    } else if(argv.numbers == 'false') {
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }

    var result = ''
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    if(argv.uppercase) {
        result = result.toUpperCase()
    } else if (argv.lowercase) {
        result = result.toLowerCase()
    }

    console.log("Output "+result)

})
.command('ip', 'start the server', (yargs) => {}, async (argv) => {
    console.log("Your Private IP : "+ip.address())
})
.command('ip-external', 'start the server', (yargs) => { }, async (argv) => {
    var getip = function () {
        superagent
          .get('https://ip.cn/api/index?ip=&type=0')
          .set('User-Agent', 'curl/7.37.1')
          .end(function (err, res) {
            const obj = JSON.parse(res.text)
            console.log("External IP Address : "+obj['ip'])
          });
      };

    getip();
})
.command('headline', 'start the server', (yargs) => {}, async (argv) => {
    ;(async () => {
        const result = await axios.get('https://www.kompas.com/')
        
        // console.log()
        const $ = cherio.load(result.data)
        
        // load(result.data)
        const text = $('.col-bs10-7')
        
        text.each(function(i, el) {
            //const hasil = $(this).text()
            if (i == 1) {
                //console.log($(this).html())
                const dataHtml = $(this).html()
                const $2 = cherio.load(dataHtml);
                const lastest = $2('.latest')
                lastest.text(function(loop, el2) {
                    if (loop == 0) {
                        const dataHtml2 = $2(this).html()
                        const $3 = cherio.load(dataHtml2);
                        const article = $3('.article__list')
                        article.each(function(j,el3) {
                            const dataHtml3 = $3(this).html()
                            const $4 = cherio.load(dataHtml3);
                            const articleTitle = $4('.article__list__title')
                            articleTitle.each(function(k,el4) {
                                console.log("Title : "+$4(this).find('a').text())
                                const attrb = $4(this).find('a').attr()
                                console.log("URL : "+attrb['href'])
                            })
                        })
                    }
                })
            }
        })
    
    })()
})
.command(
    "convert <messages...>",
    "Convert",
    messageOption,
    converts
)
.command('screenshot <message>', 'start the server', (yargs) => {}, async (argv) => {
    capture
  .stream({
    url: 'https://github.com/',
    width: 800,
    height: 600
  })
  .pipe(fs.createWriteStream(`${__dirname}/example-stream.png`))
  .on('close', () => console.log('open example-stream.png'))
})

.command('movies', 'start the server', (yargs) => {}, async (argv) => {
    ;(async () => {
        const result = await axios.get('https://www.cgv.id/en/loader/home_movie_list')

        const now_playing = result.data['now_playing']
        
        const $ = cherio.load(now_playing)
        
        const tagA = $('li')
        
        const baseURL = 'https://www.cgv.id'
        tagA.each(function(i, el) {
            const attrb = $(this).find('a').attr()
            const urls = baseURL+attrb['href']
            console.log("URL : "+urls)
            const resultMovies = axios.get(urls)
            console.log(resultMovies)
            // const $Movies = cherio.load(resultMovies.data)
            // const tagTitle = $('.movie-info-title')
            // console.log("tagTitle : "+tagTitle)
        })

    })()
})


// parse and process CLI args
yargs.demandCommand()
yargs.parse()

