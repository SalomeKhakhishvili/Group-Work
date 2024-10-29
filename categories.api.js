const API_KEY = "1vpxH5UWS87ro5SwSQVGbdaUayeNNYpWdxtqP28QkyGCEONE2A";
const API_URL = "/api/v1/categories";

const headers = {
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ADD category
export const addCategory = async (categoryData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify([categoryData]), // გამოგზავნეთ როგორც ობიექტების სია
  });
  
  console.log('გაგზავნილი კატეგორიის მონაცემები:', [categoryData]); // მონაცემების ლოგირება
  console.log('პასუხის სტატუსი:', response.status); // სტატუსის ლოგირება
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('შეცდომის პასუხი:', errorData); // შეცდომის ლოგირება
    throw new Error('კატეგორიის დამატების შეცდომა: ' + errorData.error);
  }
  
  const data = await response.json();
  console.log('დამატებული კატეგორია:', data);
  return data.items;
};

// GET categories
export const getCategories = async () => {
  const response = await fetch(API_URL, { headers });
  const data = await response.json();
  console.log('მოპოვებული კატეგორიები:', data);
  return data;
};

// UPDATE category
export const updateCategory = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// DELETE category
export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};