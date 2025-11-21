import React, { useState, useEffect } from 'react';
import ItemFrame from '../../components/ItemFrame/ItemFrame';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

const mockFurnitureData = [
  {
    id: 1,
    name: 'Modern Chair',
    mod: 'MrCrayfish',
    type: 'Chairs',
    image: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Modern+Chair',
    description: 'A sleek modern chair perfect for contemporary builds.'
  },
  {
    id: 2,
    name: 'Oak Bookshelf',
    mod: 'Bibliocraft',
    type: 'Storage',
    image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Oak+Bookshelf',
    description: 'Classic oak bookshelf for storing your enchanted books.'
  },
  {
    id: 3,
    name: 'Chandelier',
    mod: 'Decocraft',
    type: 'Lights',
    image: 'https://via.placeholder.com/200x200/FFD700/FFFFFF?text=Chandelier',
    description: 'Elegant chandelier to light up your grand hall.'
  },
  {
    id: 4,
    name: 'Coffee Table',
    mod: 'MrCrayfish',
    type: 'Tables',
    image: 'https://via.placeholder.com/200x200/A0522D/FFFFFF?text=Coffee+Table',
    description: 'Perfect for your living room setup.'
  },
  {
    id: 5,
    name: 'Vase',
    mod: 'Decocraft',
    type: 'Decoration',
    image: 'https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Vase',
    description: 'Decorative vase to brighten up any room.'
  },
  {
    id: 6,
    name: 'Cabinet',
    mod: 'Bibliocraft',
    type: 'Storage',
    image: 'https://via.placeholder.com/200x200/654321/FFFFFF?text=Cabinet',
    description: 'Spacious cabinet for all your storage needs.'
  }
];

const Home = () => {
  const [furniture, setFurniture] = useState(mockFurnitureData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMod, setSelectedMod] = useState('All Mods');
  const [selectedType, setSelectedType] = useState('All Types');

  useEffect(() => {
    let filtered = mockFurnitureData;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMod !== 'All Mods') {
      filtered = filtered.filter(item => item.mod === selectedMod);
    }

    if (selectedType !== 'All Types') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFurniture(filtered);
  }, [searchTerm, selectedMod, selectedType]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Modded Minecraft Furniture Gallery</h1>
        <p>Discover amazing furniture items from various Minecraft mods</p>
      </div>
      
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedMod={selectedMod}
        onModFilterChange={setSelectedMod}
        selectedType={selectedType}
        onTypeFilterChange={setSelectedType}
      />

      <div className="gallery-grid">
        {furniture.map(item => (
          <ItemFrame key={item.id} item={item} />
        ))}
      </div>

      {furniture.length === 0 && (
        <div className="no-results">
          <h3>No furniture items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Home;