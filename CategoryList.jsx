import React, { useEffect, useState } from 'react';
import { getCategories, updateCategory, deleteCategory } from '../categories.api';
import Header from './Header';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (id) => setEditMode(id);

  const handleSave = async (id, updatedData) => {
    try {
      await updateCategory(id, updatedData);
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category._uuid === id ? { ...category, ...updatedData } : category
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(prevCategories => prevCategories.filter(category => category._uuid !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setCategories(prevCategories => 
      prevCategories.map(category =>
        category._uuid === id ? { ...category, easyCare: !category.easyCare } : category
      )
    );
  };

  return (
    <div>
      <Header />
      <div>
        <h2>All Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category._uuid}>
              {editMode === category._uuid ? (
                <>
                  <input
                    type="text"
                    defaultValue={category.title}
                    onChange={(e) => category.title = e.target.value}
                  />
                  <input
                    type="text"
                    defaultValue={category.description}
                    onChange={(e) => category.description = e.target.value}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={category.easyCare}
                      onChange={() => handleCheckboxChange(category._uuid)}
                    />
                    Easy Care
                  </label>
                  <button onClick={() => handleSave(category._uuid, {
                    title: category.title,
                    description: category.description,
                    easyCare: category.easyCare,
                  })}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <p>Easy Care: {category.easyCare ? 'Yes' : 'No'}</p>
                  <button onClick={() => handleEdit(category._uuid)}>Edit</button>
                  <button onClick={() => handleDelete(category._uuid)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;