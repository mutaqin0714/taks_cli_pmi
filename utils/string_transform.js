const lowercase = ({message}) => {
    const results = message.toLowerCase();
    console.log(results)
}

const uppercase = ({message}) => {
    const results = message.toUpperCase();
    console.log(results)
}

const capitalize = ({message}) => {
    const results = message.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    console.log(results)
}

module.exports = {
    lowercase,
    uppercase,
    capitalize
}