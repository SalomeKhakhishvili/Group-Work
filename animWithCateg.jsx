import React, { useEffect, useState } from 'react';
import { getAnimals } from '../animals.api';
import { getCategories } from '../categories.api';
import Header from './Header';
import { updateAnimalCategoryApi } from '../animals.api';
import '../App.css'; // Importing the CSS

const CategAndAnim = () => {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalData = await getAnimals();
        setAnimals(animalData.items);

        const categoryData = await getCategories();
        setCategories(categoryData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (animalId, categoryId) => {
    const categoryTitle = categories.find(category => category._uuid === categoryId)?.title || '';
    setSelectedCategories(prev => ({
      ...prev,
      [animalId]: { id: categoryId, title: categoryTitle },
    }));

    setAnimals(prevAnimals => 
      prevAnimals.map(animal => 
        animal._uuid === animalId ? { ...animal, categoryTitle } : animal
      )
    );
  };

  const handleSave = async (animalId) => {
    const selectedCategory = selectedCategories[animalId] || { title: '' };
    try {
      await updateAnimalCategory(animalId, selectedCategory.title);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const updateAnimalCategory = async (animalId, categoryTitle) => {
    const response = await updateAnimalCategoryApi(animalId, { categoryTitle });
    if (!response.ok) {
      throw new Error('Failed to update animal category');
    }
    return response.json();
  };

  return (
    <div className="CategAndAnim-container">
      <Header />
      <div>
        <h2>All Animals with Categories</h2>
        <ul className="CategAndAnim-list">
          {animals.map((animal) => (
            <li key={animal._uuid}>
              <p>Name: {animal.name}</p>
              <p>Price: {animal.price}</p>
              <p>Description: {animal.description}</p>
              <p>Popular: {animal.isPopular ? 'Yes' : 'No'}</p>
              <p>Stock: {animal.stock}</p>
              <p>Category: {animal.categoryTitle || "Not selected"}</p>
              <p>Life Expectancy: {animal.lifeExpectancy ? `${animal.lifeExpectancy} years` : 'There is no information'}</p>
              <label>
                Select or edit Category: 
                <select 
                  onChange={(e) => handleCategoryChange(animal._uuid, e.target.value)} 
                  value={selectedCategories[animal._uuid]?.id || ''}
                >
                  <option value="">--Choose Category--</option>
                  {categories.map((category) => (
                    <option key={category._uuid} value={category._uuid}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleSave(animal._uuid)}>Save</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategAndAnim;

