const router = require("express").Router();

const { getCategories, getSeries, getStories } = require("../utils/database")


router.get("/categories", (req, res, nxt) => {
    getCategories()
      .then(data => res.json(data))
      .catch(err => res.json([]));
});

router.get("/categories/i/:id", async (req, res, nxt) => {
    const { id } = req.params;
    getCategoryById(id)
      .then(data => res.json(data))
      .catch(err => res.json([]))
});


router.get("/stories", (req, res, nxt) => {
    getStories()
      .then(data => res.json(data))
      .catch(err => res.json([]));
});

router.get("/stories/i/:id", async (req, res, nxt) => {
    const { id } = req.params;
    res.json(await getStoryById(id));
});

router.get("/stories/e", async (req, res, nxt) => {
    res.json(await getEditorsPick());
});

router.get("/stories/f", async (req, res, nxt) => {
    res.json(await getFeaturedStories());
});

router.get("/stories/f/:category", async (req, res, nxt) => {
    const { category } = req.params;
    res.json(await getFeaturedStoriesByCategory(category));
});

router.get("/stories/c/:category", async (req, res, nxt) => {
    const { category } = req.params;
    res.json(await getStoriesByCategory(category));
});

router.get("/stories/s/:id/:chapter", async (req, res, nxt) => {
    const { id, chapter } = req.params;
    res.json(await getStoryIdBySeriesInfo(id, chapter));
});


router.get("/series", (req, res, nxt) => {
    getSeries()
      .then(data => res.json(data))
      .catch(err => res.json([]));
});

router.get("/stories/n/:name", async (req, res, nxt) => {
    const { name } = req.params;
    res.json(await getStoriesBySeriesName(name))
});

router.get("/series/n/:name", async (req, res, nxt) => {
    const { name } = req.params;
    res.json(await getSeriesByName(name)); 
});

router.get("/series/i/:id", async (req, res, nxt) => {
    const { id } = req.params;
    res.json(await getSeriesById(id)); 
});

router.get("/series/f", async (req, res, nxt) => {
    res.json(await getFeaturedSeries());
});



const netVotes = (blog) => blog.upvotes - blog.downvotes;

const calculateScore = (blog) => {
  let score = netVotes(blog);
  score += blog.series ? 5 : 0;
  score += blog.rating * 10;
  return score;
};

const getSeriesByName = (name) => {
  return getSeries()
    .then(data => data.find(item => item.id === `series-${name.toLowerCase()}`));
}

const getStoryById = (id) => {
  return getStories()
    .then(data => data.find(item => item.id === Number(id)));
}

const getEditorsPick = () => {
  return getStories()
    .then(data => data
        .reduce((best, blog) => calculateScore(blog) > calculateScore(best) ? blog : best));
};

const getFeaturedStories = (count = 3) => {
  return getStories()
    .then(data => data
      .sort((a, b) => calculateScore(b) - calculateScore(a))
      .slice(0, count)
    );
};

const getFeaturedStoriesByCategory = (category, count = 3) => {
  return getStories()
    .then(data => data
      .filter((blog) => blog.categories.includes(category))
      .sort((a, b) => calculateScore(b) - calculateScore(a))
      .slice(0, count)
    );
};

const getStoriesByCategory = (category) => {
  return getStories()
    .then(data => data
      .filter((blog) => blog.categories.includes(category))
    );
};

const getFeaturedSeries = (count = 3) => {
  return getSeries()
    .then(data => data
      .sort((a, b) => calculateScore(b) - calculateScore(a))
      .slice(0, count)
    );
};

const getStoriesBySeriesName = (name) => {
  return getStories()
    .then(data => data
      .filter((blog) => blog.series?.title === name)
      .sort((a, b) => a.series.chapter - b.series.chapter)
    );
};

const getStoryIdBySeriesInfo = (id, chapter) => {
  return getStories()
    .then(data => {
      const blog = data.find(
        blog => blog.series?.id === id && blog.series?.chapter === Number(chapter)
      );
      return blog ? blog.id : undefined;
    });
};

const getSeriesById = (id) => {
  return getSeries()
    .then(data => data.find(item => item.id === Number(id)));
}

const getCategoryById = (id) => {
  return getCategories()
    .then(data => data.find(item => item.id === Number(id)));
}

module.exports = router;
