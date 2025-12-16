import { useState, useEffect } from 'react';
import './App.css';
import EquipmentList from '../components/EquipmentList.jsx';
import { getEquipment, createEquipment, updateEquipment, deleteEquipment, getInventory } from './api/equipments.js';
import EncounterButton from '../components/EcounterButton.jsx';

function App() {
  // State management
  const [equipment, setEquipment] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [newEquipmentTitle, setNewEquipmentTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [log,setLog] = useState(``);
  const [equippedItem, setEquippedItem] = useState(null);
  // const [monster, setMonster] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);


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
    equipment.carried=true;
    console.log(equippedItem);
  }

  /**
   * Add a new equipment
   * Not implemented in final product due to players not being able to create their own equipment
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
  // 'drop' equipment
  // remove equipment from inventory without removing it from the database
  const handleDropEquipment = async (equipmentId) => {
    try {
      await updateEquipment(equipmentId,
        {carried:'false'}
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

  const handlePickupEquipment = async (equipmentId) => {
    try {
      const newEquipment = await updateEquipment(equipmentId,
        {carried:'true'}
      );
      setInventory(inventory);

    } catch (err) {
      console.error('Error dropping equipment:', err);
      setError('Failed to drop equipment');
    }
  }

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * equipment.length);
    setRandomNumber(randomNumber);
  }

  const handleEncounter = async () => {
    /*button.style.cursor = "not-allowed";
    setMonsterHealth(health);
    setMonsterRounds(rounds);
    for (let i=0; i < monsterRounds;i++){
      if(equippedItem){
        setMonsterHealth(monsterHealth => monsterHealth -Math.floor(Math.random() * (equippedItem.damageHigh-equippedItem.damageLow) + equippedItem.damageLow));
      } else{
       setMonsterHealth(monsterHealth => monsterHealth - Math.floor(Math.random() * (1-0) + 0));
      }
      if(monsterHealth<=0){

      }
    }*/
   // ===== Code above is the WIP 'combat' system =====
   // ===== Code below allows random pickups when you enter a room as a temporary solution to show features =====
    generateRandomNumber();
    handlePickupEquipment(equipment[randomNumber]._id);
    console.log("Item picked up: " + equipment[randomNumber].equipmentName);
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

        {/* Panel 2: map */}
        <div className="map-section">
          <h2>Map</h2>
          <div className="map-grid">
            <EncounterButton onClick={handleEncounter} text={"cell 1"} />
            <EncounterButton onClick={handleEncounter} text={"cell 2"} />
            <EncounterButton onClick={handleEncounter} text={"cell 3"} />
            <EncounterButton onClick={handleEncounter} text={"cell 4"} />
            <EncounterButton onClick={handleEncounter} text={"cell 5"} />
            <EncounterButton onClick={handleEncounter} text={"cell 6"} />
            <EncounterButton onClick={handleEncounter} text={"cell 7"} />
            <EncounterButton onClick={handleEncounter} text={"cell 8"} />
            <EncounterButton onClick={handleEncounter} text={"cell 9"} />
            <EncounterButton onClick={handleEncounter} text={"cell 10"} />
            <EncounterButton onClick={handleEncounter} text={"cell 11"} />
            <EncounterButton onClick={handleEncounter} text={"cell 12"} />
          </div>
        </div>

        {/* Panel 3: text output
        ===== Code below is a relic of old plan for 'encounter' system, unimplemented in time alloted =====
        <div className="text-section">
          <h2> Text output</h2>
        </div>*/}

        {/* Panel 3: loot pool */}
        <div className="equipment-section">
          <h2>Loot Pool</h2>
          <h3>Click to pick up</h3>
          {/* Loot pool list */}
          <EquipmentList
            equipment={equipment}
            equippedItem={equippedItem}
            onSelectEquipment={handleEquipItem}
            onDeleteEquipment={handleDeleteEquipment}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
