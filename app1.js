#!/usr/bin/env node
const { program } = require("@caporal/core")

program
  .command("lowercase", "Kecilkan Huruf")
  .argument("<type>", "Tulis Kata")
  .action(({ logger, args }) => {
    logger.info("Output: %s", args.type.toLowerCase())
  })
  .command("uppercase", "Besarkan Huruf")
  .argument("<type>", "Tulis Kata")
  .action(({ logger, args }) => {
    logger.info("Output: %s", args.type.toUpperCase())
  })
  .command("capitalize", "Setiap Kata, Huruf Depannya Besar")
  .argument("<type>", "Tulis Kata")
  .action(({ logger, args }) => {
    var str = args.type
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    logger.info("Output: %s", str)
  })
  .command("palindrome", "Dibaca sama depan belakang")
  .argument("<type>", "Tulis Kalimat")
  .action(({ logger, args }) => {
    let str = args.type
    var lowStr = str.toLowerCase()
    var str2 = str.split('').reverse().join('').toLowerCase()
    console.log("String: %s", str)
    if (lowStr == str2) {
      console.log("Is palindrome?: Yes")
    } else {
      console.log("Is palindrome?: No")
    }
  })

program.run()