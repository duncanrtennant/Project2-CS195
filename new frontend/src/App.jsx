import { useState, useEffect } from 'react';
import './App.css';
import EquipmentList from '../components/EquipmentList.jsx';
import PomodoroTimer from '../components/PomodoroTimer.jsx';
import { getEquipment, createEquipment, updateEquipment, deleteEquipment } from './api/equipments.js';

function App() {
  // State management
  const [equipment, setEquipment] = useState([]);
  const [activeEquipment, setActiveEquipment] = useState(null);
  const [newEquipmentTitle, setNewEquipmentTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load equipments from database on mount
  useEffect(() => {
    loadEquipment();
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
   * Toggle equipment completion
   *
  const handleToggleComplete = async (equipmentId) => {
    try {
      // Find the equipment to get current completion status
      const equipment = equipments.find(t => t._id === equipmentId);
      
      // 1. Update in database
      const updatedEquipment = await updateEquipment(equipmentId, { 
        completed: !equipment.completed 
      });
      
      // 2. Update in React state
      setEquipments(equipments.map(t => 
        t._id === equipmentId ? updatedEquipment : t
      ));
    } catch (err) {
      console.error('Error toggling equipment:', err);
      setError('Failed to update equipment');
    }
  };*/

  /**
   * Delete a equipment
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
        <p>Leightweight One-screen Dungeon</p>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="main-content">
        {/* Left side: Inventory */}
        <div className="equipment-section">
          <h2>Inventory</h2>
          

          {/* Equipment List */}
          <EquipmentList
            equipment={equipment}
            onDeleteEquipment={handleDeleteEquipment}
          />
        </div>

        {/* Right side: Equipment */}
        <div className="timer-section">
          <h2>Focus Time</h2>
          {activeEquipment ? (
            <>
              <div className="active-equipment-display">
              </div>
            </>
          ) : (
            <div className="no-equipment-selected">
              <p>← Select a equipment to start focusing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
