import axios from "axios";

const get = (path) => {
  return axios
    .get(`${import.meta.env.VITE_APP_HOST}${path}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Something went wrong.", err);
      return [];
    });
};

export const getCategories = () => get("/categories");

export const getStories = () => get("/stories");

export const getStoryById = (id) => get(`/stories/i/${id}`);

export const getEditorsPick = () => get(`/stories/e`);

export const getFeaturedStories = () => get(`/stories/f`);

export const getFeaturedStoriesByCategory = (category) => get(`/stories/f/${category}`);

export const getStoriesByCategory = (category) => get(`/stories/c/${category}`);

export const getStoryIdBySeriesInfo = (id, chapter) => get(`/stories/s/${id}/${chapter}`);

export const getSeries = () => get(`/series`);

export const getStoriesBySeriesName = (name) => get(`/series/n/${name}`);

export const getSeriesByName = (name) => get(`/series/id/${name}`);

export const getFeaturedSeries = () => get("/series/f");

