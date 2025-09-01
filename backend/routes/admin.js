
const router = require("express").Router();

const { getCategories, getSeries, getStories } = require("../utils/database")

router.get("/stats", async (req, res, nxt) => {
  const stories = await getStories();
  const series = await getSeries();
  const categories = await getCategories();
  return res.json([
    { label: "Stories", value: stories.length },
    { label: "Series", value: series.length },
    { label: "Categories", value: categories.length },
    { label: "User Interactions", value: randomNumber() },
  ]);
});


function randomNumber(min=10000, max=99999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const adminRouter = router;
module.exports = adminRouter;

