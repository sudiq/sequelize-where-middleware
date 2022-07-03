const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const checkArray = (value) => {
  if (value.length > 2) {
    return false;
  }
  for (let val in value) {
    if (isNaN(+val)) {
      return false;
    }
  }
  return true;
};

function goDeeper(deepObject, key = '', res = {}) {
  if (key.indexOf('$') > -1) {
    operator = key.substring(1);
    key = Op[operator];
  }
  
  if (typeof deepObject != "object" || checkArray(deepObject)) {
    return { [key]: deepObject };
  }
  
  let temp = {};
  for (let op in deepObject) {
    let newres = goDeeper(deepObject[op], op, res);
    temp = { ...temp, ...newres };
  }
  return { ...{ [key]: temp }, ...res };
}

exports.retrieveWhere = function (whereStr) {
  if (typeof whereStr != "string") {
    throw new Error("invalid input type");
  }
  try {
    const whereObj = JSON.parse(whereStr);
    const result = goDeeper(whereObj, "where");
    return result;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("invalid JSON");
    }
  }
};
