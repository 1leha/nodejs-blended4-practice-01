const fsPromises = require("fs").promises;
const chalk = require("chalk");
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtentions = require("./helpers/checkExtention");

const createFile = (fileName, content) => {
  const data = { fileName, content };
  const validatedData = dataValidator(data);

  const filePath = path.join(__dirname, "./files", fileName);

  if (validatedData.error) {
    console.log(
      chalk.red(
        `Plese specify ${validatedData.error.details[0].context?.key} parameter`
      )
    );
    return;
  }

  const { isCorrectExtention, fileExt } = checkExtentions(fileName);
  if (!isCorrectExtention) {
    console.log(chalk.red(`This APP does not support extention: ${fileExt}`));
  }

  fsPromises
    .writeFile(filePath, data.content, "utf8")
    .then((res) =>
      console.log(chalk.green(`File ${fileName} was created successfuly!`))
    )
    .catch((err) => console.log(chalk.red("File write ERROR! ", err)));
};

const getFiles = () => {
  fsPromises
    .readdir(path.join(__dirname, "./files"))
    .then((files) => {
      if (files.length === 0) {
        console.log(chalk.red(`Folder is empty`));
        return;
      }
      files.forEach((file) => console.log(chalk.cyanBright(file)));
    })
    .catch(console.log);
};

const getFile = (fileName) => {
  fsPromises
    .readdir(path.join(__dirname, "./files"))
    .then((files) => {
      if (!files.includes(fileName)) {
        console.log(chalk.red(`The file ${fileName} wasn't found!`));
      }
      fsPromises
        .readFile(path.join(__dirname, "./files", fileName), "utf8")
        .then((content) => {
          fsPromises
            .stat(__dirname, "./files", fileName)
            .then(({ size, birthtime }) =>
              console.log({
                message: "Success",
                fileName,
                extention: checkExtentions(fileName).fileExt,
                content,
                createdAt: birthtime.toString(),
                fileSize: size,
              })
            );
        })
        .catch(console.log);
    })
    .catch(console.log);
};

module.exports = {
  createFile,
  getFiles,
  getFile,
};
