const fs = require("fs");
const path = require("path");

const getData = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(`Something went wrong while fetching ${file}: ${err}`);
      }
      resolve(JSON.parse(data || "[]"));
    });
  });
};

const saveData = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        reject(`Error saving to ${file}: ${err}`);
      }
      resolve(true);
    });
  });
};

const categoriesFile = path.join(__dirname, "database", "categories.json");
const storiesFile = path.join(__dirname, "database", "stories.json");
const seriesFile = path.join(__dirname, "database", "series.json");

// const getCategories = () => getData(categoriesFile);
// const getStories = () => getData(storiesFile);
// const getSeries = () => getData(seriesFile);

const getCategories = async () => {
  const data = await getData(categoriesFile);
  return data.filter((c) => !c.deleted);
};

const getStories = async () => {
  const data = await getData(storiesFile);
  return data.filter((s) => !s.deleted);
};

const getSeries = async () => {
  const data = await getData(seriesFile);
  return data.filter((s) => !s.deleted);
};

const softDeleteCategory = async (id) => {
  return softDelete(categoriesFile, id);
};

const softDeleteStory = async (id) => {
  return softDelete(storiesFile, id);
};

const softDeleteSeries = async (id) => {
  return softDelete(seriesFile, id);
};

const softDelete = async (file, id) => {
  const all = await getData(file);
  const idx = all.findIndex((s) => s.id === Number(id));
  if (idx > -1) {
    all[idx].deleted = true;
    await saveData(file, all);
    return all[idx];
  }
  return null;

}

const saveCategory = (category) => {
  return save(categoriesFile, category);
};

const saveStory = (story) => {
  return save(storiesFile, story);
};

const saveSeries = (series) => {
  return save(seriesFile, series);
};

const save = async (file, data) => {
  const collection = await getData(file);
  const idx = collection.findIndex((c) => c.id === Number(data.id));
  if (idx > -1) {
    collection[idx] = { ...collection[idx], ...data };
  } else {
    data.id = data.id || Date.now();
    collection.push(data);
  }
  await saveData(file, collection);
  return data;

}

const deleteCategory = (id) => {
  return remove(categoriesFile, id);
};

const deleteStory = (id) => {
  return remove(storiesFile, id);
};

const deleteSeries = (id) => {
  return remove(seriesFile, id);
};

const remove = async (file, id) => {
  const collection = await getData(file);
  const updated = collection.filter(c => c.id !== Number(id));
  await saveData(file, updated);
  return true;
}

const updateCategory = (id, data) => {
  return update(categoriesFile, id, data);
};

const updateStory = (id, data) => {
  return update(storiesFile, id, data);
};

const updateSeries = (id, data) => {
  return update(seriesFile, id, data);
};

const update = async (file, id, data) => {
  const collection = await getData(file);
  const idx = collection.findIndex((c) => c.id === Number(id));
  if (idx > -1) {
    collection[idx] = data;
    await saveData(file, collection);
    return collection[idx];
  }
  return null;
}

module.exports = {
  getCategories,
  getStories,
  getSeries,
  saveCategory,
  saveStory,
  saveSeries,
  deleteCategory,
  deleteStory,
  deleteSeries,
  softDeleteCategory,
  softDeleteStory,
  softDeleteSeries,
  updateCategory,
  updateSeries,
  updateStory
};

