import React, { useState, useEffect } from 'react';
import ItemFrame from '../../components/ItemFrame/ItemFrame';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { getPopularMods, searchMods } from '../../api/modsAPI';

const Home = () => {
  const [furniture, setFurniture] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMod, setSelectedMod] = useState('All Mods');
  const [selectedType, setSelectedType] = useState('All Types');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMods = async () => {
      setLoading(true);
      const modsData = await getPopularMods();
      
      // Convert mod data to furniture format
      const furnitureData = modsData.map((mod, index) => ({
        id: index + 1,
        name: mod.name,
        mod: mod.author,
        type: getRandomType(),
        image: mod.icon || 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Mod+Icon',
        description: mod.description || 'A popular Minecraft mod for furniture and decorations.',
        modRequirements: `${mod.name} v1.0+`,
        craftingRecipe: 'Various crafting recipes',
        downloads: mod.downloads,
        modUrl: mod.modUrl
      }));
      
      setFurniture(furnitureData);
      setLoading(false);
    };

    fetchMods();
  }, []);

  const getRandomType = () => {
    const types = ['Chairs', 'Tables', 'Storage', 'Decoration', 'Lights', 'Furniture'];
    return types[Math.floor(Math.random() * types.length)];
  };

  // Filter logic remains the same
  useEffect(() => {
    let filtered = furniture;

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
  }, [searchTerm, selectedMod, selectedType, furniture]);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading mods...</div>
      </div>
    );
  }

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