const fs = require("fs");
const path = require("path");

const idStore = path.join(__dirname, "database", "id.json");

const getNextId = (type) => {
  try {
    // Load file
    let data = { stories: 0, categories: 0, series: 0 };
    if (fs.existsSync(idStore)) {
      data = JSON.parse(fs.readFileSync(idStore, "utf8"));
    }

    // Increment the correct counter
    if (!(type in data)) {
      data[type] = 0; // initialize if not present
    }
    data[type] += 1;

    // Save back
    fs.writeFileSync(idStore, JSON.stringify(data, null, 2));

    return data[type];
  } catch (err) {
    console.error("Error generating ID:", err);
    return null;
  }
}

module.exports = {
  getNextId
}
