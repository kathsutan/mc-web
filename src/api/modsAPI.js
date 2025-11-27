const MODS_API_BASE = "https://api.modrinth.com/v2";

const mapMods = (hits) =>
  hits.map((mod) => ({
    id: mod.project_id,
    name: mod.title,
    description: mod.description,
    downloads: mod.downloads,
    icon: mod.icon_url,
    author: mod.author,
    modUrl: `https://modrinth.com/mod/${mod.slug}`,
  }));

// find & filter furniture mods 
export const searchMods = async (query) => {
  const fullQuery =
    query && query.trim().length > 0
      ? `furniture ${query.trim()}`
      : "furniture";

  try {
    const response = await fetch(
      `${MODS_API_BASE}/search?query=${encodeURIComponent(
        fullQuery
      )}&facets=[["project_type:mod"]]`
    );
    const data = await response.json();
    return mapMods(data.hits);
  } catch (error) {
    console.error("Error fetching mods:", error);
    return [];
  }
};

export const getPopularMods = async () => {
  try {
    const response = await fetch(
      `${MODS_API_BASE}/search?query=${encodeURIComponent(
        "furniture"
      )}&facets=[["project_type:mod"]]&limit=50&index=downloads`
    );
    const data = await response.json();
    return mapMods(data.hits);
  } catch (error) {
    console.error("Error fetching popular mods:", error);
    return [];
  }
};
