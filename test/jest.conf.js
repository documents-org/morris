const path = require("path");

module.exports = {
  preset: "ts-jest",
  rootDir: path.resolve(__dirname, "../"),
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1"
  }
};
