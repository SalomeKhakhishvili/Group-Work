const API_KEY = "1vpxH5UWS87ro5SwSQVGbdaUayeNNYpWdxtqP28QkyGCEONE2A";
const API_URL = "/api/v1/animal";

const headers = {
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// GET animals
export const getAnimals = async () => {
  const response = await fetch(API_URL, { headers });
  const data = await response.json();
  console.log('Fetched animals:', data);
  return data;
};

// ADD animal
export const addAnimal = async (animalData) => {
 const response = await fetch(API_URL, {
   method: 'POST',
   headers: { ...headers, 'Content-Type': 'application/json' },
   body: JSON.stringify([animalData]),
 });
 const data = await response.json();
 console.log('Added animal:', data);
 return data.items;
};

// UPDATE animal
export const updateAnimal = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// DELETE animal
export const deleteAnimal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};

// UPDATE ANIMAL WITH CATEGORIES
export const updateAnimalCategoryApi = async (animalId, data) => {
  const response = await fetch(`${API_URL}/${animalId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update animal category');
  }
  return response.json();
};