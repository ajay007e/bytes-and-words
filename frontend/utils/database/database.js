import axios from "axios";

const API_HOST = import.meta.env.VITE_APP_HOST;

const get = (path) => {
  return axios
    .get(`${API_HOST}${path}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Something went wrong.", err);
      return [];
    });
};

const post = (path, data) => {
  return axios
    .post(`${API_HOST}${path}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("POST request failed:", err);
      return null;
    });
};

export const getCategories = () => get("/categories");

export const getCategoryById = (id) =>get(`/categories/i/${id}`); 

export const getStories = () => get("/stories");

export const getStoryById = (id) => get(`/stories/i/${id}`);

export const getEditorsPick = () => get(`/stories/e`);

export const getFeaturedStories = () => get(`/stories/f`);

export const getFeaturedStoriesByCategory = (category) => get(`/stories/f/${category}`);

export const getStoriesByCategory = (category) => get(`/stories/c/${category}`);

export const getStoryIdBySeriesInfo = (id, chapter) => get(`/stories/s/${id}/${chapter}`);

export const getSeries = () => get(`/series`);

export const getStoriesBySeriesName = (name) => get(`/stories/n/${name}`);

export const getSeriesByName = (name) => get(`/series/n/${name}`);

export const getSeriesById = (id) => get(`/series/i/${id}`);

export const getFeaturedSeries = () => get("/series/f");

export const getDashboardStats = () => get("/admin/stats");

export const getDataOptions = () => get("/admin/options");

export const createCategory = (data) => post("/admin/c/ctg", data);

export const createSeries = (data) => post("/admin/c/srs", data);

export const createStory = (data) => post("/admin/c/sts", data);

export const deleteCategory = (id) => post(`/admin/d/ctg/${id}`, {});

export const deleteSeries = (id) => post(`/admin/d/srs/${id}`, {});

export const deleteStory = (id) => post(`/admin/d/sts/${id}`, {});

export const updateCategory = (id, data) => post(`/admin/e/ctg/${id}`, data);

export const updateSeries = (id, data) => post(`/admin/e/srs/${id}`, data);

export const updateStory = (id, data) => post(`/admin/e/sts/${id}`, data);

