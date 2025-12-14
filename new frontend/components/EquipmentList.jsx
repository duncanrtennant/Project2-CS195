import EquipmentItem from './EquipmentItem';

function EquipmentList({ equipment, equippedItem, onDeleteEquipment, onSelectEquipment }) {
  if (equipment.length === 0) {
    return (
      <div className="empty-state">
        <p>No equipment yet. Explore the map to find more</p>
      </div>
    );
  }

  return (
    <div className="equipment-list">
      {equipment.map((equipment) => (
        <EquipmentItem
          key={equipment._id}
          equipment={equipment}
          isEquipped={equippedItem?._id === equipment._id}
          onSelect={() => onSelectEquipment(equipment)}
          onDelete={() => onDeleteEquipment(equipment._id)}
        />
      ))}
    </div>
  );
}

export default EquipmentList;
