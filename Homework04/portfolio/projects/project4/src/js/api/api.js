const BASE_URL = "https://fakerapi.it/api/v2";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchUsers(amount) {
  const response = await fetchData(`/persons?_quantity=${amount}`);
  return response.data;
}

export async function fetchImages(amount) {
  const response = await fetchData(`/images?_quantity=${amount}`);
  return response.data;
}

export async function fetchTexts(amount, characters = 500) {
  const response = await fetchData(
    `/texts?_quantity=${amount}&_characters=${characters}`,
  );
  return response.data;
}
