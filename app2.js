#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
var ip = require('ip');
var superagent = require('superagent');
const axios = require('axios')
const cherio = require('cheerio')
//const {publicIp} = require('public-ip');

yargs(hideBin(process.argv))
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
  .command('ip', 'start the server', (yargs) => {}, async (argv) => {
      console.log("Your Private IP : "+ip.address())
  })
    .command('ip-external', 'start the server', (yargs) => { }, async (argv) => {
        var getip = function () {
            superagent
              .get('https://ip.cn/')
              .set('User-Agent', 'curl/7.37.1')
              .end(function (err, res) {
                console.log(res.text);
                // if (err) {
                //   console.log(err);
                // }
                // var ip = res.text.match(/\d+\.\d+\.\d+\.\d+/)[0];
                // console.log(ip)
                // Here is the result
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
  .parse()