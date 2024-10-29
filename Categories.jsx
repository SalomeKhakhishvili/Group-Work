import React, { useState } from 'react';
import Header from './Header';
import { addCategory } from '../categories.api';

const Categories = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    easyCare: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(formData);
      setFormData({ title: '', description: '', easyCare: false });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="easyCare"
              checked={formData.easyCare}
              onChange={handleChange}
            />
            Easy Care
          </label>
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default Categories;