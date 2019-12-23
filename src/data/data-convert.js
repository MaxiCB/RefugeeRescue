const csvToJson = require('convert-csv-to-json');

const input = 'refugee-data.csv';
const output = 'data.json';

csvToJson.fieldDelimiter(';')
    .formatValueByType()
    .generateJsonFileFromCsv(input, output);

//let json = csvToJson.getJsonFromCsv(input);

// for(let i=0; i<json.length; i++){
//     console.log(json[i]);
// }