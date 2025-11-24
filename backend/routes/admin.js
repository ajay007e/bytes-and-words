
const router = require("express").Router();

const { 
  getCategories,
  getSeries,
  getStories,
  saveCategory,
  saveSeries,
  saveStory,
  deleteCategory,
  deleteSeries,
  deleteStory,
  updateCategory,
  updateSeries,
  updateStory
} = require("../utils/database");
const { getNextId } = require("../utils/generator");

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

router.get("/options", async (req, res, next) => {
  try {
    const stories = await getStories();
    const series = await getSeries();
    const categories = await getCategories();

    return res.json({
      series: series.map((s) => ({ label: s.title, value: s.id })),
      authors: [...new Set(stories.map((s) => s.author).filter(Boolean))].map(
        (a) => ({ label: a, value: a })
      ),
      tags: [
        ...new Set(
          stories.flatMap((s) => (Array.isArray(s.tags) ? s.tags : []))
        ),
      ].map((t) => ({ label: t, value: t })),
      categories: categories.map((c) => ({ label: c.name, value: c.id })),
    });
  } catch (err) {
    next(err);
  }
});


router.post("/c/ctg", async (req, res, nxt) => {
  const data = req.body;
  try {
    validateCategoryData(data);
    const id = getNextId("categories");
    const category = {
      ...data,
      id,
      "href": `/category/${id}`
    }
    await saveCategory(category);
    res.status(201).json({status: "Success", message: "Category created", category});
  } catch (err) {
    nxt(err);
  }
});

router.post("/d/ctg/:id", async (req, res, nxt) => {
  const { id } = req.params;
  try {
    deleteCategory(id);
    // TODO : remove category from stories
    // TODO : update category tags from series
    res.status(200).json({staus: "Success", message: "Category deleted"});
  } catch (err) {
    nxt(err);
  }
});

router.post("/e/ctg/:id", async (req, res, nxt) => {
  const { id } = req.params;
  const data = req.body;
  try {
    validateCategoryData(data);
    validateId(id, data.id);
    const category = updateCategory(id, data);
    // TODO : update category from stories
    // TODO : update category tags from series
    res.status(200).json({staus: "Success", message: "Category updated", category});
  } catch (err) {
    nxt(err);
  }
});

router.post("/c/srs", async (req, res, nxt) => {
  const data = req.body;
  try {
    validateSeriesData(data);
    const id = getNextId("series")
    const series = {
      ...data,
      id,
      "authors": [],
      "noOfChapters": 0,
      "href": `/series/${id}`,
      "categories": [],
      "upvotes": 0,
      "downvotes": 0,
      "rating": 0.0
    }
    await saveSeries(series);
    res.status(201).json({status: "Success", message: "Series created", series});
  } catch (err) {
    nxt(err);
  }
});

router.post("/d/srs/:id", async (req, res, nxt) => {
  const { id } = req.params;
  try {
    deleteSeries(id);
    // TODO : remove series from stories
    res.status(200).json({staus: "Success", message: "Series deleted"});
  } catch (err) {
    nxt(err);
  }
});

router.post("/e/srs/:id", async (req, res, nxt) => {
  const { id } = req.params;
  const data = req.body;
  try {
    validateSeriesData(data);
    validateId(id, data.id);
    const series = updateSeries(id, data);
    res.status(200).json({staus: "Success", message: "Series updated", series});
  } catch (err) {
    nxt(err);
  }
});


router.post("/c/sts", async (req, res, nxt) => {
  const data = req.body;
  try {
    validateStoryData(data);
    const id = getNextId("stories");
    const story = {
      id,
      ...data,
      "readTime": getReadingTime(data.content),
      "href": `/story/${id}`,
      "upvotes": 0,
      "downvotes": 0,
      "rating": 0.0
    }
    const series = updateSeriesWithNewStory(story);
    await saveStory({
      ...story,
      chapter:series.noOfChapters
    });
    res.status(201).json({status: "Success", message: "Story created", story});
  } catch (err) {
    nxt(err);
  }
});

router.post("/d/sts/:id", async (req, res, nxt) => {
  const { id } = req.params;
  try {
    deleteStory(id);
    // TODO : remove chapter from series
    // TODO : reorder the series
    res.status(200).json({status: "Success", message: "Story deleted"});
  } catch (err) {
    nxt(err);
  }
});

router.post("/e/sts/:id", async (req, res, nxt) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data)
  try {
    validateStoryData(data);
    validateId(id, data.id);
    data = {
      ...data,
      "readTime": getReadingTime(data.content),
    }
    const story = updateStory(id, data);
    res.status(200).json({staus: "Success", message: "Story updated", story});
  } catch (err) {
    nxt(err);
  }
});



const updateSeriesWithNewStory = async (story) => {
  if (!story.isPartOfSeries) return;
  const seriesId = story.series;
  const series = await getSeriesById(seriesId); // assume async
  if (!series) {
    throw new Error(`Series with id ${seriesId} not found`);
  }
  const updatedAuthors = Array.from(
    new Set([...(series.authors || []), story.author].filter(Boolean))
  );
  const updatedCategories = Array.from(
    new Set([...(series.categories || []), ...(story.categories || [])])
  );
  const updatedSeries = {
    ...series,
    authors: updatedAuthors,
    categories: updatedCategories,
    noOfChapters: (series.noOfChapters || 0) + 1,
  };
  await saveSeries(updatedSeries);
  return updatedSeries;
};


const validateStoryData = (data) => {
  if (!data) {
    const err = new Error("Invalid input provided");
    err.status = 400;
    throw err;
  }
  if (!data.title || data.title.trim() === "") {
    const err = new Error("Title required");
    err.status = 400;
    throw err;
  } 
  if (!data.description || data.description.trim() === "") {
    const err = new Error("Description required");
    err.status = 400;
    throw err;
  }
  if (!data.content || data.content.trim() === "") {
    const err = new Error("Story content required");
    err.status = 400;
    throw err;
  }
  if (!data.author || data.author.trim() === "") {
    const err = new Error("Author required");
    err.status = 400;
    throw err;
  }
  if (!data.categories || data.categories.length === 0) {
    const err = new Error("Categories required");
    err.status = 400;
    throw err;
  }
  if (!data.imageUrl || data.imageUrl.trim() === "") {
    const err = new Error("Image Url required");
    err.status = 400;
    throw err;
  }
}

const validateSeriesData = (data) => {
  if(!data) {
    const err = new Error("Invalid input provided");
    err.status = 400;
    throw err;
  } 
  if (!data.title || data.title.trim() === "") {
    const err = new Error("Title required");
    err.status = 400;
    throw err;
  } 
  if (!data.description || data.description.trim() === "") {
    const err = new Error("Description required");
    err.status = 400;
    throw err;
  }
  if (!data.imageUrl || data.imageUrl.trim() === "") {
    const err = new Error("Image Url required");
    err.status = 400;
    throw err;
  }
}

const validateCategoryData = (data) => {
  if(!data) {
    const err = new Error("Invalid input provided");
    err.status = 400;
    throw err;
  } 
  if (!data.name || data.name.trim() === "") {
    const err = new Error("Title required");
    err.status = 400;
    throw err;
  } 
  if (!data.description || data.description.trim() === "") {
    const err = new Error("Description required");
    err.status = 400;
    throw err;
  }
  if (!data.imageUrl || data.imageUrl.trim() === "") {
    const err = new Error("Image Url required");
    err.status = 400;
    throw err;
  }
}

const validateId = (id, _id) => {
  if (!id || !_id) {
    const err = new Error("Unable to find Id");
    err.status = 400;
    throw err;
  }
  if (toString(id) !== toString(_id)) {
    const err = new Error("Id doesn't match");
    err.status = 400;
    throw err;
  }
}

const getReadingTime = (text, wpm = 200) => {
  if (!text) return "0 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return `${minutes} min read`;
}

const getSeriesById = async (id) => {
  const series = await getSeries();
  return series.find((s) => s.id === id);
};


const randomNumber = (min=10000, max=99999999) => 
  Math.floor(Math.random() * (max - min + 1)) + min;



const adminRouter = router;
module.exports = adminRouter;

