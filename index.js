require("chalk");
const argv = require("yargs").argv;

const { createFile, getFiles, getFile } = require("./files");

const envockeActions = ({ action, fileName, content }) => {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;
    case "get":
      getFiles();
      break;
    case "find":
      getFile(fileName);
      break;

    default:
      console.warn("Unknown action type");
  }
};

envockeActions(argv);
