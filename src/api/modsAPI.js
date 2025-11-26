const MODS_API_BASE = 'https://api.modrinth.com/v2';

export const searchMods = async (query) => {
  try {
    const response = await fetch(
      `${MODS_API_BASE}/search?query=${encodeURIComponent(query)}&facets=[["project_type:mod"]]`
    );
    const data = await response.json();
    return data.hits.map(mod => ({
      id: mod.project_id,
      name: mod.title,
      description: mod.description,
      downloads: mod.downloads,
      icon: mod.icon_url,
      author: mod.author,
      modUrl: `https://modrinth.com/mod/${mod.slug}`
    }));
  } catch (error) {
    console.error('Error fetching mods:', error);
    return [];
  }
};

export const getPopularMods = async () => {
  try {
    const response = await fetch(
      `${MODS_API_BASE}/search?facets=[["project_type:mod"]]&limit=20&index=downloads`
    );
    const data = await response.json();
    return data.hits.map(mod => ({
      id: mod.project_id,
      name: mod.title,
      description: mod.description,
      downloads: mod.downloads,
      icon: mod.icon_url,
      author: mod.author,
      modUrl: `https://modrinth.com/mod/${mod.slug}`
    }));
  } catch (error) {
    console.error('Error fetching popular mods:', error);
    return [];
  }
};