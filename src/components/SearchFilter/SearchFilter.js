import React from 'react';

const SearchFilter = ({ searchTerm, onSearchChange, selectedMod, onModFilterChange, selectedType, onTypeFilterChange }) => {
  const mods = ['All Mods', 'Decocraft', 'MrCrayfish', 'Bibliocraft', 'Chisels & Bits'];
  const furnitureTypes = ['All Types', 'Chairs', 'Tables', 'Storage', 'Decoration', 'Lights'];

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search furniture items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="minecraft-input"
        />
      </div>
      <div className="filter-boxes">
        <select 
          value={selectedMod} 
          onChange={(e) => onModFilterChange(e.target.value)}
          className="minecraft-select"
        >
          {mods.map(mod => (
            <option key={mod} value={mod}>{mod}</option>
          ))}
        </select>
        <select 
          value={selectedType} 
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="minecraft-select"
        >
          {furnitureTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;