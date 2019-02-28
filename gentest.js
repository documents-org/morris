const https = require("https");
const parse = require("csv-parse");
const spreadsheet_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHDGzcEMT3FkEvMxCl8PyqqadIad4_CI0QyXZvywU_Hz499cvt-zE29oMV7FvPfSVeyK2jAeMD7OUg/pub?gid=624239970&single=true&output=csv";
const generate = require("./test/morris.test.ts.template");
const fs = require("fs");

/**
 * Fetches the spreadsheet from Google, CSV format
 * @returns {Promise<any>}
 */
const getSpreadsheetData = () =>
  new Promise((resolve, reject) => {
    https
      .get(spreadsheet_url, response => {
        let d = "";
        response.on("data", chunk => (d += chunk));
        response.on("end", () => {
          resolve(d);
        });
      })
      .on("error", reject);
  });

/**
 * Parses CSV to nested arrays
 * @param data
 * @returns {Promise<any>}
 */
const parseSpreadsheetData = data =>
  new Promise((resolve, reject) => {
    parse(data, {}, (err, out) => {
      if (err) reject(err);
      resolve(out);
    });
  });

/**
 * Converts CSV parser output to objects
 */
const constructSpreadsheetLines = data =>
  new Promise((resolve, reject) => {
    const headers = data[0];
    const lineConstructor = values => {
      return headers.reduce((obj, header) => {
        obj[header] = values[Object.keys(obj).length];
        return obj;
      }, {});
    };
    const lines = data.slice(1);
    resolve(lines.map(lineConstructor));
  });

/**
 * Matches on test types
 * @type {RegExp}
 */
const typeRegex = /(test|resultat)_/;

/**
 * Extracts the available types of tests
 * @param line
 * @returns {Array}
 */
const extractTestTypes = line => {
  return Object.keys(line)
    .filter(k => typeRegex.test(k))
    .map(key => key.replace(typeRegex, ""))
    .reduce((b, a) => (b.indexOf(a) === -1 ? b.concat([a]) : b), []);
};

/**
 * Extracts the tests from a table line
 * @param line
 * @param testTypes
 * @returns {Array}
 */
const extractTestsFromLine = (line, testTypes) => {
  // prendre de la ligne uniquement les clefs test_* et resultat_*
  const cleanedLine = Object.entries(line).reduce((out, kv) => {
    if (!typeRegex.test(kv[0])) return out;
    out[kv[0]] = kv[1];
    return out;
  }, {});
  // les grouper par type dans un objet { type: {test,resultat}, type2: {test, resultat}}
  const byType = testTypes.reduce((out, tt) => {
    out[tt] = Object.entries(cleanedLine).reduce((b, a) => {
      if (a[0].indexOf(tt) === -1) return b;
      b[a[0].replace(`_${tt}`, "")] = a[1];
      return b;
    }, {});
    return out;
  }, {});
  // réduire cela en [{type, test, resultat}, {type, test, resultat}, {type, test, resultat}]
  return Object.entries(byType).reduce((out, entry) => {
    if (entry[1].test === "") return out;
    return out.concat([{ type: entry[0], ...entry[1] }]);
  }, []);
};

/**
 * Transforms the lines from the spreadsheet to test rules
 * Three assumptions are made : some lines have an "id" header
 * Tests start with test_ & expected results start with resultat_
 * Lines have a description_en & description_fr field
 * This allows us to add context-specific tests to the table
 * Without modifying this script
 * @param lines
 * @returns {Promise<any>}
 */
const spreadsheetLinesToRules = lines =>
  new Promise((resolve, reject) => {
    const types = extractTestTypes(lines[0]);
    resolve(
      lines.reduce((tests, line) => {
        if (line.id && line.id !== "") {
          tests.push({
            id: line.id,
            description_fr: line.description_fr,
            description_en: line.description_en,
            tests: extractTestsFromLine(line, types)
          });
        } else if (tests.length > 0) {
          tests[tests.length - 1].tests.concat(
            extractTestsFromLine(line, types)
          );
        }
        return tests;
      }, [])
    );
  });

/**
 * Renders the tests to Jest format
 * @param tests
 * @returns {Promise<any>}
 */
const renderToTs = tests =>
  new Promise((resolve, reject) => {
    resolve(generate(tests));
  });

/**
 * Writes the test file
 * @param testString
 * @returns {Promise<any>}
 */
const writeTestFile = testString =>
  new Promise((resolve, reject) => {
    fs.writeFile("./test/morris.test.ts", testString, "utf8", err => {
      if (err) reject(err);
      resolve();
    });
  });

getSpreadsheetData()
  .then(parseSpreadsheetData)
  .then(constructSpreadsheetLines)
  .then(spreadsheetLinesToRules)
  .then(renderToTs)
  .then(writeTestFile);
