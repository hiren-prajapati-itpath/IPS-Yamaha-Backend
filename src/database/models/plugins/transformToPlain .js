// function to transform Sequelize instances into plain JavaScript objects
const transformAfterFind = (result) => {
  if (Array.isArray(result)) {
    return result.map((item) => item.toJSON());
  }
  if (result instanceof Object) {
    return result.toJSON();
  }
  return result;
};

module.exports = transformAfterFind;
