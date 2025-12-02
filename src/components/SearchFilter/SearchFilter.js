import React from "react";
import './SearchFilter.css'

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeFilterChange,
}) => {
  const furnitureTypes = [
    "All Types",
    "Chairs",
    "Tables",
    "Storage",
    "Decoration",
    "Lights",
  ];

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleTypeChange = (e) => {
    onTypeFilterChange(e.target.value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search furniture items (e.g. chair, table, kitchen)..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="minecraft-input"
        />
      </div>

      <div className="filter-boxes">
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="minecraft-select"
        >
          {furnitureTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
