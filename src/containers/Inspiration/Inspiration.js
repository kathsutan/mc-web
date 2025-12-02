import React, { useState } from 'react';
import './Inspiration.css'

const Inspiration = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const YOUTUBE_API_KEY = 'AIzaSyBaGMKWQn6cxyRicZ6k3e2cAKEG5SFqhPA';

  const getMockVideos = () => {
    const mockVideos = [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Modern Minecraft Kitchen Build Tutorial',
        thumbnail: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Kitchen+Build',
        channel: 'Minecraft Builds',
        views: '150K',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'abc123',
        title: 'Medieval Tavern Design Guide',
        thumbnail: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Tavern+Design',
        channel: 'Building Masters',
        views: '89K',
        videoUrl: 'https://www.youtube.com/watch?v=abc123'
      },
      {
        id: 'def456',
        title: 'Modern House with MrCrayfish Furniture',
        thumbnail: 'https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Modern+House',
        channel: 'Modded Builds',
        views: '204K',
        videoUrl: 'https://www.youtube.com/watch?v=def456'
      }
    ];
    setVideos(mockVideos);
  };

  const searchYouTubeVideos = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${encodeURIComponent(
          query + ' minecraft build'
        )}&type=video&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        const videoData = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
        setVideos(videoData);
      }
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      getMockVideos();
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchPrompt.trim()) {
      setHasSearched(true);          // user search → hide AI suggestions
      searchYouTubeVideos(searchPrompt);
    } else {
      // no search prompt → show AI suggestions, clear videos
      setHasSearched(false);
      setVideos([]);
    }
  };

  const openVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
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
          placeholder="Enter a prompt like 'modern kitchen build' or 'medieval tavern design'"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          className="inspiration-input"
        />
        <button type="submit" className="minecraft-button primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search Inspiration'}
        </button>
      </form>

      {loading && <div className="loading">Loading videos...</div>}

      {videos.length > 0 && (
        <div className="videos-grid">
          <h2>Related Build Videos</h2>
          <div className="videos-container">
            {videos.map(video => (
              <div
                key={video.id}
                className="video-card"
                onClick={() => openVideo(video.videoUrl)}
              >
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-channel">{video.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasSearched && ( // suggestions
        <div className="ai-suggestions">
          <h2>Search Suggestions</h2>
          <div className="suggestion-cards">
            <div className="suggestion-card">
              <h3>Starter Houses</h3>
              <p>
                Find simple survival bases, dirt hut upgrades, or cute cottage starter bases.
              </p>
            </div>
            <div className="suggestion-card">
              <h3>Medieval Castle</h3>
              <p>
                Combine various mods with medieval castles, keeps, watchtowers, blacksmiths, and even taverns.
              </p>
            </div>
            <div className="suggestion-card">
              <h3>Japanese Garden House</h3>
              <p>
                Build Zen gardens or cherry blossom houses with the combination of multiple mods.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspiration;
