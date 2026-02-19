import React, { useContext, useMemo, useState } from "react";
import Player from "../components/Player";
import EmptyState from "../components/EmptyState";
import TrackItem from "../components/TrackItem";
import { dataContext } from "../context/UserContext";
import { songsData } from "../songs";

function Playlist() {
  const { playlists, createPlaylist, deletePlaylist } = useContext(dataContext);
  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState(playlists[0]?.id || "default");

  const activePlaylist = useMemo(
    () => playlists.find((p) => p.id === activeId) || playlists[0],
    [playlists, activeId]
  );

  const tracks = useMemo(() => {
    const ids = new Set(activePlaylist?.trackIds || []);
    return songsData.filter((s) => ids.has(s.id));
  }, [activePlaylist]);

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center pt-[20px] md:pt-[100px] gap-[20px] pb-[160px]">
      <div className="w-[90%] md:w-[60%]">
        <div className="text-white text-[28px] font-bold">Playlists</div>
        <div className="text-gray-300 text-[14px]">
          Create playlists and save songs.
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const id = createPlaylist(name);
            if (id) setActiveId(id);
            setName("");
          }}
        >
          <input
            className="flex-1 h-[44px] rounded-xl bg-gray-800 text-white px-4 outline-none border border-gray-700 focus:border-gray-500"
            placeholder="New playlist name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="h-[44px] px-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200"
          >
            Create
          </button>
        </form>
      </div>

      <div className="w-[90%] md:w-[60%] flex gap-2 overflow-auto pb-1">
        {playlists.map((pl) => (
          <button
            key={pl.id}
            onClick={() => setActiveId(pl.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border ${
              pl.id === activeId
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-gray-700 hover:border-gray-500"
            }`}
          >
            {pl.name}
            <span className="ml-2 text-[12px] opacity-80">
              ({pl.trackIds.length})
            </span>
          </button>
        ))}
      </div>

      <div className="w-[90%] md:w-[60%] flex items-center justify-between">
        <div className="text-white text-[18px] font-semibold">
          {activePlaylist?.name || "Playlist"}
        </div>
        {activePlaylist?.id !== "default" ? (
          <button
            className="text-white text-[13px] px-3 py-2 rounded-full border border-gray-700 hover:border-gray-500"
            onClick={() => {
              deletePlaylist(activePlaylist.id);
              setActiveId("default");
            }}
          >
            Delete
          </button>
        ) : null}
      </div>

      {tracks.length === 0 ? (
        <EmptyState
          title="No songs in this playlist"
          subtitle="Use the playlist (+) icon on any track to add it here."
        />
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          {tracks.map((song) => (
            <TrackItem
              key={song.id}
              song={song}
              variant="playlist"
              playlistId={activePlaylist?.id}
            />
          ))}
        </div>
      )}

      <Player />
    </div>
  );
}

export default Playlist;
