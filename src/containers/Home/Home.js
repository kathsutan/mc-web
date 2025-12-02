import React, { useState, useEffect } from "react";
import ItemFrame from "../../components/ItemFrame/ItemFrame";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import { getPopularMods } from "../../api/modsAPI";
import './Home.css';

// adds keywords so it can search better
const TYPE_KEYWORDS = {
  Chairs: ["chair", "chairs", "sofa", "couch", "stool", "bench", "seat"],
  Tables: ["table", "tables", "desk", "counter", "workbench", "dining"],
  Storage: [
    "storage",
    "chest",
    "drawer",
    "drawers",
    "dresser",
    "cabinet",
    "wardrobe",
    "shelf",
    "shelves"
  ],
  Lights: [
    "lamp",
    "lamps",
    "lantern",
    "lanterns",
    "light",
    "lights",
    "lighting",
    "chandelier",
    "torch",
    "candles",
    "candle"
  ],
  Decoration: [
    "decor",
    "decoration",
    "painting",
    "picture",
    "plant",
    "flower",
    "rug",
    "curtain",
    "frame",
    "poster",
    "stove",
    "oven",
    "sink",
    "kitchen",
    "knife",
    "cutlery",
    "sofa",
    "couch"
  ]
};

function deriveTypeFromText(name, description) {
  const text = ((name || "") + " " + (description || "")).toLowerCase();

  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return type;
    }
  }

  return "Decoration";
}


const KEYWORD_TYPE_MAP = {
  chair: ["Chairs"],
  chairs: ["Chairs"],
  seating: ["Chairs"],
  seat: ["Chairs"],
  sofa: ["Chairs", "Decoration"],
  couch: ["Chairs", "Decoration"],

  table: ["Tables", "Decoration"],
  tables: ["Tables", "Decoration"],
  dining: ["Tables"],
  desk: ["Tables"],
  counter: ["Tables", "Decoration"],

  storage: ["Storage"],
  chest: ["Storage"],
  drawer: ["Storage"],
  drawers: ["Storage"],
  dresser: ["Storage"],
  cabinet: ["Storage"],
  wardrobe: ["Storage"],
  shelf: ["Storage"],
  shelves: ["Storage"],
  fridge: ["Storage"],

  light: ["Lights"],
  lights: ["Lights"],
  lamp: ["Lights"],
  lamps: ["Lights"],
  lantern: ["Lights"],
  lanterns: ["Lights"],
  chandelier: ["Lights"],
  torch: ["Lights"],
  torches: ["Lights"],

  decoration: ["Decoration"],
  decor: ["Decoration"],
  plant: ["Decoration"],
  flower: ["Decoration"],
  rug: ["Decoration"],
  curtain: ["Decoration"],
  curtains: ["Decoration"],
  picture: ["Decoration"],
  painting: ["Decoration"],
  poster: ["Decoration"],
  frame: ["Decoration"],

  bed: ["Decoration"],
  beds: ["Decoration"],
  bedroom: ["Decoration"],

  livingroom: ["Decoration"],
  living: ["Decoration"],
  kitchen: ["Decoration", "Tables"],
  cooking: ["Decoration"],
  oven: ["Decoration"],
  stove: ["Decoration"],
  sink: ["Decoration"],
  bathroom: ["Decoration"],
  knife: ["Decoration"],
  knives: ["Decoration"]
};

const Home = () => {
  const [allFurniture, setAllFurniture] = useState([]);
  const [filteredFurniture, setFilteredFurniture] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [loading, setLoading] = useState(true);

  // FETCH MODS ONCE
  useEffect(() => {
    const fetchMods = async () => {
      setLoading(true);
      const modsData = await getPopularMods();

      const furnitureData = modsData.map((mod, index) => ({
        id: index + 1,
        name: mod.name,
        mod: mod.author,
        type: deriveTypeFromText(mod.name, mod.description),
        image:
          mod.icon ||
          "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Mod+Icon",
        description:
          mod.description ||
          "A popular Minecraft mod for furniture and decorations.",
        modRequirements: `${mod.name} v1.0+`,
        craftingRecipe: "Various crafting recipes",
        downloads: mod.downloads,
        modUrl: mod.modUrl
      }));

      setAllFurniture(furnitureData);
      setFilteredFurniture(furnitureData);   // initial gallery
      setLoading(false);
    };

    fetchMods();
  }, []);

  useEffect(() => {
    let result = allFurniture;
    const term = searchTerm.trim().toLowerCase();

    if (term !== "") {
      const mappedTypes = KEYWORD_TYPE_MAP[term];

      result = result.filter((item) => {
        const name = (item.name || "").toLowerCase();
        const desc = (item.description || "").toLowerCase();
        const type = (item.type || "").toLowerCase();
        const mod = (item.mod || "").toLowerCase();

        const textMatch =
          name.includes(term) ||
          desc.includes(term) ||
          type.includes(term) ||
          mod.includes(term);

        const typeMatch = mappedTypes && mappedTypes.includes(item.type);

        return textMatch || typeMatch;
      });
    }

    if (selectedType !== "All Types") {
      result = result.filter((item) => item.type === selectedType);
    }

    setFilteredFurniture(result);
  }, [searchTerm, selectedType, allFurniture]);

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
        selectedType={selectedType}
        onTypeFilterChange={setSelectedType}
      />

      <div className="gallery-grid">
        {filteredFurniture.map((item) => (
          <ItemFrame key={item.id} item={item} />
        ))}
      </div>

      {filteredFurniture.length === 0 && (
        <div className="no-results">
          <h3>No furniture items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Home;
