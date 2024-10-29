import React, { useState } from 'react';
import { addAnimal } from '../animals.api';
import Header from '../pages/Header';

const AddAnimal = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [stock, setStock] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatedPrice = Math.max(0, parseFloat(price) || 0);
    const validatedStock = Math.max(0, parseInt(stock) || 0);
    const validatedLifeExpectancy = Math.max(0, parseInt(lifeExpectancy) || 0);

    const animalData = { 
      name, 
      price: validatedPrice,
      description, 
      isPopular, 
      stock: validatedStock,
      lifeExpectancy: validatedLifeExpectancy
    };
    
    try {
      await addAnimal(animalData);
      setName('');
      setPrice('');
      setDescription('');
      setIsPopular(false);
      setStock('');
      setLifeExpectancy('');
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Animal Name" 
          required 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => {
            const value = Math.max(0, parseFloat(e.target.value) || 0);
            setPrice(value);
          }} 
          placeholder="Price" 
          required 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <label>
          <input 
            type="checkbox" 
            checked={isPopular} 
            onChange={() => setIsPopular(!isPopular)} 
          />
          პოპულარული
        </label>
        <input 
          type="number" 
          value={stock} 
          onChange={(e) => {
            const value = Math.max(0, parseInt(e.target.value) || 0);
            setStock(value);
          }} 
          placeholder="Stock" 
          required 
        />
        <input 
          type="number"
          value={lifeExpectancy} 
          onChange={(e) => {
            const value = Math.max(0, parseInt(e.target.value) || 0);
            setLifeExpectancy(value);
          }} 
          placeholder="Life Expectancy" 
          required 
        />
        <button type="submit">დაამატე ცხოველი</button>
      </form>
    </div>
  );
};

export default AddAnimal;