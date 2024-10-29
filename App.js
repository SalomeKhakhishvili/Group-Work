import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/animalList';
import AddAnimals from './pages/addanimals';
import Categories from './pages/Categories';
import CategoryList from './pages/CategoryList';
import CategAndAnim from './pages/animWithCateg';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/add-animals" element={<AddAnimals />} />        
        <Route path="/categorieslist" element={<CategoryList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/CategAndAnim" element={<CategAndAnim />} />
      </Routes>
    </Router>
  );
};

export default App;