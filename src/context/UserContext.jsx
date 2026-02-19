import React, { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { songsData } from '../songs'

export const dataContext = createContext()

function UserContext({ children }) {
  let audioRef = useRef(new Audio())
  let [index,setIndex]=useState(0)
  let [playingSong,setPlayingSong]=useState(false)

  // --- Library state (liked + playlists) persisted in localStorage ---
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const raw = localStorage.getItem("likedIds");
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  });

  const [playlists, setPlaylists] = useState(() => {
    try {
      const raw = localStorage.getItem("playlists");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
      return [{ id: "default", name: "My Playlist", trackIds: [] }];
    } catch {
      return [{ id: "default", name: "My Playlist", trackIds: [] }];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("likedIds", JSON.stringify(Array.from(likedIds)));
    } catch {
      // ignore
    }
  }, [likedIds]);

  useEffect(() => {
    try {
      localStorage.setItem("playlists", JSON.stringify(playlists));
    } catch {
      // ignore
    }
  }, [playlists]);
  useEffect(() => {
    audioRef.current.src = songsData[index].song
    audioRef.current.load()
    if (playingSong) {
      playSong()
    }
  }, [index])

  function playSong() {
    setPlayingSong(true)
    audioRef.current.play()
  }

  function pauseSong() {
    setPlayingSong(false)
    audioRef.current.pause()
  }

   function nextSong() {
    setIndex((prev)=>(prev+1)%songsData.length)
  }

   function prevSong() {
     setIndex((prev) => {
       if (prev === 0) {
        return songsData.length-1
       }
       else {
         return prev-1
       }
    })
  }

  const isLiked = (songId) => likedIds.has(songId);

  function toggleLike(songId) {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return next;
    });
  }

  function createPlaylist(name) {
    const clean = String(name || "").trim();
    if (!clean) return;
    const id = `pl_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setPlaylists(prev => [{ id, name: clean, trackIds: [] }, ...prev]);
    return id;
  }

  function addToPlaylist(playlistId, songId) {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id !== playlistId) return pl;
        if (pl.trackIds.includes(songId)) return pl;
        return { ...pl, trackIds: [...pl.trackIds, songId] };
      })
    );
  }

  function removeFromPlaylist(playlistId, songId) {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id !== playlistId) return pl;
        return { ...pl, trackIds: pl.trackIds.filter(id => id !== songId) };
      })
    );
  }

  function deletePlaylist(playlistId) {
    setPlaylists(prev => {
      const next = prev.filter(pl => pl.id !== playlistId);
      return next.length ? next : [{ id: "default", name: "My Playlist", trackIds: [] }];
    });
  }

  const likedSongs = useMemo(
    () => songsData.filter(s => likedIds.has(s.id)),
    [likedIds]
  );

  let value = {
    audioRef,
    playSong,
    pauseSong,
    playingSong,
    setPlayingSong,
    nextSong,
    index,
    setIndex,
    prevSong,

    // library
    likedIds,
    likedSongs,
    isLiked,
    toggleLike,
    playlists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,

  }
  return (
      <div>
          <dataContext.Provider value={value}> 
              {children}
          </dataContext.Provider>
     
    </div>
  )
}

export default UserContext
