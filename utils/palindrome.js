module.exports = ({message}) => {
    let str = message
    var lowStr = str.toLowerCase()
    var str2 = str.split('').reverse().join('').toLowerCase()
    console.log("String: %s", str)
    if (lowStr == str2) {
      console.log("Is palindrome?: Yes")
    } else {
      console.log("Is palindrome?: No")
    }
}