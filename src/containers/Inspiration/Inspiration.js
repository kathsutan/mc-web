import React, { useState } from 'react';

const Inspiration = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const mockVideos = [
      {
        id: 1,
        title: 'Modern Minecraft Kitchen Build',
        thumbnail: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Kitchen+Build',
        channel: 'Minecraft Builds',
        views: '150K'
      },
      {
        id: 2,
        title: 'Medieval Tavern Design',
        thumbnail: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Tavern+Design',
        channel: 'Building Masters',
        views: '89K'
      },
      {
        id: 3,
        title: 'Modern House with MrCrayfish Furniture',
        thumbnail: 'https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Modern+House',
        channel: 'Modded Builds',
        views: '204K'
      }
    ];
    setVideos(mockVideos);
  };

  return (
    <div className="inspiration-container">
      <div className="inspiration-header">
        <h1>Build Inspiration</h1>
        <p>Get inspired by amazing Minecraft builds and design ideas</p>
      </div>

      <form onSubmit={handleSearch} className="inspiration-search">
        <input
          type="text"
          placeholder="Enter a prompt like 'Minecraft modern kitchen build' or 'village tavern design'"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          className="inspiration-input"
        />
        <button type="submit" className="minecraft-button primary">
          Search Inspiration
        </button>
      </form>

      {videos.length > 0 && (
        <div className="videos-grid">
          <h2>Related Build Videos</h2>
          <div className="videos-container">
            {videos.map(video => (
              <div key={video.id} className="video-card">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-channel">{video.channel}</p>
                  <p className="video-views">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ai-suggestions">
        <h2>AI Design Suggestions</h2>
        <div className="suggestion-cards">
          <div className="suggestion-card">
            <h3>Modern Villa</h3>
            <p>Use MrCrayfish modern furniture set with clean lines and neutral colors. Incorporate large windows and open spaces.</p>
          </div>
          <div className="suggestion-card">
            <h3>Medieval Castle</h3>
            <p>Combine Decocraft decorative items with Bibliocraft storage. Use stone textures and warm lighting.</p>
          </div>
          <div className="suggestion-card">
            <h3>Japanese Garden House</h3>
            <p>Feature minimalist furniture from MrCrayfish mod. Use bamboo and cherry blossom decorations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;