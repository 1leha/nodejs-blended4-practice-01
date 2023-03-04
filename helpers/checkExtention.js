const checkExtentions = (fileName) => {
  const EXTENTIONS = ["json", "txt", "yaml", "js", "xml"];

  const fileExt = fileName.slice(fileName.lastIndexOf(".") + 1);

  return {
    isCorrectExtention: EXTENTIONS.some((ext) => ext === fileExt),
    fileExt,
  };
};

module.exports = checkExtentions;
