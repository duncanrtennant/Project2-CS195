import { useState, useEffect } from 'react';
import './App.css';
import EquipmentList from '../components/EquipmentList.jsx';
import { getEquipment, createEquipment, updateEquipment, deleteEquipment, getInventory } from './api/equipments.js';

function App() {
  // State management
  const [equipment, setEquipment] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [newEquipmentTitle, setNewEquipmentTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [log,setLog] = useState(``);
  const [equippedItem, setEquippedItem] = useState(null);

  // Load equipments from database on mount
  useEffect(() => {
    loadEquipment();
    loadInventory();
  }, []);

  /**
   * Fetch all equipments from backend
   */
  const loadEquipment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEquipment();
      setEquipment(data);
    } catch (err) {
      console.error('Error loading equipment:', err);
      setError('Failed to load equipment. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch only equipped equipment from backend
  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      console.error('Error loading equipment:', err);
      setError('Failed to load equipment. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEquipItem = (equipment) => {
    setEquippedItem(equipment);
    console.log(equippedItem);
  }

  /**
   * Add a new equipment
   */
  const handleAddEquipment = async (e) => {
    e.preventDefault();
    if (!newEquipmentTitle.trim()) return;

    try {
      // 1. Save to database via backend
      const newEquipment = await createEquipment({ title: newEquipmentTitle });
      
      // 2. Update React state (add to beginning of list)
      setEquipment([newEquipment, ...equipment]);
      
      // 3. Clear input
      setNewEquipmentTitle('');
    } catch (err) {
      console.error('Error creating equipment:', err);
      setError('Failed to add equipment');
    }
  };

  /**
   * Delete equipment
   */
  const handleDeleteEquipment = async (equipmentId) => {
    try {
      // 1. Delete from database
      await deleteEquipment(equipmentId);
      
      // 2. Remove from React state
      setEquipment(equipment.filter(e => e._id !== equipmentId));
      
    } catch (err) {
      console.error('Error deleting equipment:', err);
      setError('Failed to delete equipment');
    }
  };

  const handleDropEquipment = async (equipmentId) => {
    try {
      await updateEquipment(equipmentId,
        {equipped:'false'}
      );
      setInventory(inventory.filter(i => i._id !== equipmentId));

      if (equippedItem?._id === equipmentId) {
        setEquippedItem(null);
      }
    } catch (err) {
      console.error('Error dropping equipment:', err);
      setError('Failed to drop equipment');
    }
  }

  const handleEncounter = async (monsterHealth, monsterRounds) => {
    for (let i=0; i < monsterRounds;i++){
      let damageRoll = Math.random() * (getInventory);
      monsterHealth-=getInventory;
      if(monsterHealth<=0){

      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="app loading">
        <div className="spinner"></div>
        <p>Loading equipment...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>LOsD</h1>
        <p>Lightweight One-screen Dungeon</p>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="main-content">
        {/* Panel 1: Inventory */}
        <div className="equipment-section">
          <h2>Inventory</h2>
          <h3>Click to equip</h3>
          {/* Inventory List */}
          <EquipmentList
            equipment={inventory}
            equippedItem={equippedItem}
            onSelectEquipment={handleEquipItem}
            onDeleteEquipment={handleDropEquipment}
          />
        </div>

        {/* Panel 3: map */}
        <div className="map-section">
          <h2>Map</h2>
          <div className="map-grid">
            <button type="button" className="map-cell">cell 1</button>
            <button className="map-cell">cell 2</button>
            <button className="map-cell">cell 3</button>
            <button className="map-cell">cell 4</button>
            <button className="map-cell">cell 5</button>
            <button className="map-cell">cell 6</button>
            <button className="map-cell">cell 7</button>
            <button className="map-cell">cell 8</button>
            <button className="map-cell">cell 9</button>
            <button className="map-cell">cell 10</button>
            <button className="map-cell">cell 11</button>
            <button className="map-cell">cell 12</button>
          </div>
        </div>

        {/* Panel 3: text output */}
        <div className="text-section">

        </div>
      </div>
    </div>
  );
}

export default App;
