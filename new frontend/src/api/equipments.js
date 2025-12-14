// Base URL for all API calls - change this for deployment
const API_URL = 'http://localhost:3001/api';

// Fetch all equipment from backend
export const getEquipment = async () => {
  const response = await fetch(`${API_URL}/equipments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch equipment`);
  }
  return response.json();
};

export const getInventory = async ()

// Create new equipment
// TODO: implement proper equipment creation
export const createEquipment = async (equipmentData) => {
  const response = await fetch(`${API_URL}/equipments`, {
    method: `POST`,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(equipmentData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create equipment`);
  }
  return response.json();
};

// Update equipment
export const updateEquipment = async (id, updates) => {
  const response = await fetch(`${API_URL}/equipments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update equipment');
  }
  return response.json();
};

// Delete equipment
export const deleteEquipment = async (id) => {
  const response = await fetch(`${API_URL}/equipments/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete equipment');
  }
  return response.json();
};
