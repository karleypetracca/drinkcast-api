/* eslint-disable no-console */
const fs = require('fs');

const text = fs.readFileSync('./never.txt', 'utf-8');
const textByLine = text.toString().split('\n');
// let questions = '';
const dbText = fs.readFileSync('./inDatabase.txt', 'utf-8');
const dbByLine = dbText.toString().split('\n');
// console.log(dbByLine);

const notInDatabase = textByLine.filter((line) => !dbByLine.includes(line));

// console.log(notInDatabase);

let toDataBase = '';
notInDatabase.forEach((line, index) => {
  let lineToCheck = line;
  if (line.includes("'")) {
    lineToCheck = line.replace("'", "''");
  }
  if (index !== notInDatabase.length - 1) {
    toDataBase = `${toDataBase} ('${lineToCheck}'),`;
  } else {
    toDataBase = `${toDataBase} ('${lineToCheck}')`;
  }
});

console.log(toDataBase.trim());
