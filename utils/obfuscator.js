module.exports = ({message}) => {
    var results = ''
    message.split('').map((item,i) => {
        let codes = item.charCodeAt(0)
        let obfus = '&#'+codes+';'
        results += obfus
    })

    console.log(results)
}