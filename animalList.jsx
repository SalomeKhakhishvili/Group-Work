import React, { useEffect, useState } from 'react';
import { getAnimals, deleteAnimal, updateAnimal } from '../animals.api';
import Header from './Header';
import '../App.css';

const AnimalList = () => {
  // State definitions
  const [animals, setAnimals] = useState([]);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    isPopular: false,
    stock: 0,
    lifeExpectancy: 0,
  });

  // Fetch animals from the API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getAnimals();
        const modifiedData = data.items.map(animal => ({
          ...animal,
          price: animal.price || 0,
          description: animal.description || '',
          isPopular: animal.isPopular || false,
          stock: animal.stock || 0,
          lifeExpectancy: animal.lifeExpectancy || 0,
        }));
        setAnimals(modifiedData);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };
    fetchAnimals();
  }, []);

  // Handle editing an animal
  const handleEdit = (animal) => {
    setEditingAnimal(animal._uuid);
    setFormData({
      name: animal.name,
      price: animal.price,
      description: animal.description,
      isPopular: animal.isPopular,
      stock: animal.stock,
      lifeExpectancy: animal.lifeExpectancy || 0,
    });
  };

  // Handle updating an animal
  const handleUpdate = async () => {
    if (!formData.name || !formData.description || formData.price < 0 || formData.stock < 0 || formData.lifeExpectancy < 0) {
      alert("Invalid input. Please check required fields and ensure values are non-negative.");
      return;
    }

    await updateAnimal(editingAnimal, formData);
    setAnimals(prevAnimals => 
      prevAnimals.map(a => (a._uuid === editingAnimal ? { ...a, ...formData } : a))
    );
    setEditingAnimal(null);
    setFormData({
      name: '',
      price: 0,
      description: '',
      isPopular: false,
      stock: 0,
      lifeExpectancy: 0,
    });
  };

  // Handle deleting an animal
  const handleDelete = async (animalId) => {
    await deleteAnimal(animalId);
    setAnimals(animals.filter(animal => animal._uuid !== animalId));
  };

  return (
    <div className="main-container">
      <Header />
      <div className="animal-list">
        {editingAnimal ? (
          <div className="edit-form">
            <h3>Edit Animal</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Math.max(0, parseFloat(e.target.value)) })}
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="checkbox-container">
              <label>
                Is Popular:
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
              </label>
            </div>
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Math.max(0, parseInt(e.target.value)) })}
            />
            <input
              type="number"
              placeholder="Life Expectancy"
              value={formData.lifeExpectancy}
              onChange={(e) => setFormData({ ...formData, lifeExpectancy: Math.max(0, parseInt(e.target.value)) })}
            />
            <button onClick={handleUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setEditingAnimal(null)}>Cancel</button>
          </div>
        ) : (
          animals.length === 0 ? (
            <p>No animals found.</p>
          ) : (
            <ul>
              {animals.map(animal => (
                <li key={animal._uuid} className="animal-item">
                  <div className="animal-details">
                    <strong>Name:</strong> {animal.name} <br />
                    <strong>Price:</strong> {animal.price} <br />
                    <strong>Description:</strong> {animal.description} <br />
                    <strong>Is Popular:</strong> {animal.isPopular ? 'Yes' : 'No'} <br />
                    <strong>Stock:</strong> {animal.stock} <br />
                    <strong>Life Expectancy:</strong> {animal.lifeExpectancy} <br />
                  </div>
                  <div className="animal-buttons">
                    <button onClick={() => handleEdit(animal)}>Edit</button>
                    <button onClick={() => handleDelete(animal._uuid)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default AnimalList;
