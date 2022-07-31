const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function goDeeper(deepObject, key = '', options, res = {}) {
  if (key.indexOf('$') > -1) {
    operator = key.substring(1);
    key = Op[operator];
  }

  const blacklist = [];

  if (options) {
    blacklist = options.blacklist || [];
  }

  if (blacklist.includes(key)) {
    return res;
  }
  
  if (Array.isArray(deepObject)) {
    return { [key]: deepObject };
  }
  
  let temp = {};
  for (let op in deepObject) {
    let newres = goDeeper(deepObject[op], op, options, res);
    temp = { ...temp, ...newres };
  }
  return { ...{ [key]: temp }, ...res };
}

exports.retrieveWhere = function (whereStr, options) {
  if (!whereStr) {
    return;
  }
  
  try {
    const whereObj = JSON.parse(whereStr);
    const result = goDeeper(whereObj, "where", options);
    return result;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("invalid JSON");
    }
  }
};
