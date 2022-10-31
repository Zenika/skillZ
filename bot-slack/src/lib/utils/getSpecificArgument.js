function getSpecificArgument(argument, text) {
  const tmp = text.split(" ");

  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].toUpperCase() === argument.toUpperCase()) return tmp[i];
  }
  return "";
}

module.exports.getSpecificArgument = getSpecificArgument;
