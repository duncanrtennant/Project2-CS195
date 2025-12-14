function EquipmentItem({ equipment, onDelete }) {
  return (
    <div className={`equipment-item`}>

      {/* Equipment content*/}
      <div className="equipment-content">
        <h3 className="equipment-name">{equipment.equipmentName}</h3>
        <div className="equip-meta">
          <span className="equip-damage-low">Low damage: {equipment.damageLow}</span><br/>
          <span className="equip-damage-high">High damage: {equipment.damageHigh}</span>
        </div>
        <div className="equip-lore">{equipment.lore}</div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="delete-button"
        aria-label="Delete Equipment"
      >
        Delete
      </button>
    </div>
  );
}

export default EquipmentItem;
