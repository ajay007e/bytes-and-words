import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import Story from "./pages/Story";
import SeriesPage from "./pages/SeriesPage";
import Series from "./pages/Series";
import CategoryPage from "./pages/CategoryPage";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import AdminStoryPreview from "./pages/AdminStoryPreview";
import AdminSeriesPreview from "./pages/AdminSeriesPreview";
import AdminCategoryPreview from "./pages/AdminCategoryPreview";
import AdminStoryCreate from "./pages/AdminStoryCreate";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="story">
          <Route index element={<StoryPage/>} />
          <Route path=":id" element={<Story/>} />
        </Route>
        <Route path="series">
          <Route index element={<SeriesPage/>} />
          <Route path=":name" element={<Series/>} />
          <Route path=":name/:chapter" element={<Story/>} />
        </Route>
        <Route path="category">
          <Route index element={<CategoryPage/>} />
          <Route path=":category" element={<Category/>} />
        </Route>
        <Route path="admin/*" element={<Dashboard/>}/>
        <Route path="admin/st/:id" element={<AdminStoryPreview/>} />
        <Route path="admin/st/c" element={<AdminStoryCreate/>} />
        <Route path="admin/sr/:id" element={<AdminSeriesPreview/>} />
        <Route path="admin/ct/:id" element={<AdminCategoryPreview/>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
)
