function EquipmentItem({ equipment, isEquipped, onDelete, onSelect }) {
  return (
    <div className={`equipment-item ${isEquipped ? 'equipped' : ''}`}>

      {/* Equipment content*/}
      <div className="equipment-content" onClick={onSelect}>
        <h3 className="equipment-name">{equipment.equipmentName}</h3>
        <div className="equip-meta">
          <span className="equip-test">Low damage: {equipment.damageLow}</span><br/>
          <span className="equip-test">High damage: {equipment.damageHigh}</span>
        </div>
        <div className="equip-lore">{equipment.lore}</div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="delete-button"
        aria-label="Delete Equipment"
      >
        Drop
      </button>
    </div>
  );
}

export default EquipmentItem;
