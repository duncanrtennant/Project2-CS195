import EquipmentItem from './EquipmentItem';

function EquipmentList({ equipment, onDeleteEquipment }) {
  if (equipment.length === 0) {
    return (
      <div className="empty-state">
        <p>No equipment yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="equipment-list">
      {equipment.map((equipment) => (
        <EquipmentItem
          key={equipment._id}
          equipment={equipment}
          onDelete={() => onDeleteEquipment(equipment._id)}
        />
      ))}
    </div>
  );
}

export default EquipmentList;
