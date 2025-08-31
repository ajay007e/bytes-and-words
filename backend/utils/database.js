const fs = require("fs");
const path = require("path");

const getData = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(`Something went wrong while fetching ${file}.$[err]`);
      }
      resolve(JSON.parse(data));
    });
  })
}

const getCategories = () => {
  const filePath = path.join(__dirname, "database", "categories.json");
  return getData(filePath);
};

const getStories = () => {
  const filePath = path.join(__dirname, "database", "stories.json");
  return getData(filePath);
};

const getSeries = () => {
  const filePath = path.join(__dirname, "database", "series.json");
  return getData(filePath);
};

module.exports = {
    getCategories,
    getStories,
    getSeries
}
