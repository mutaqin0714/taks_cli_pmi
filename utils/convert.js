var XLSX = require("xlsx");

module.exports = ({messages}) => {
    const fileOri = messages[0]
    const fileDes = messages[1]
    const workBook = XLSX.readFile(fileOri);
    XLSX.writeFile(workBook, fileDes, { bookType: "csv" });
}