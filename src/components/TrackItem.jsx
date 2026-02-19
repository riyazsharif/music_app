import React, { useContext, useMemo, useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { dataContext } from "../context/UserContext";

export default function TrackItem({
  song,
  variant = "default", // default | liked | playlist
  playlistId,
}) {
  const {
    playSong,
    setIndex,
    toggleLike,
    isLiked,
    playlists,
    addToPlaylist,
    removeFromPlaylist,
  } = useContext(dataContext);

  const liked = isLiked(song.id);

  const options = useMemo(
    () => playlists.map((p) => ({ id: p.id, name: p.name })),
    [playlists]
  );

  const [showPicker, setShowPicker] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(
    options[0]?.id || "default"
  );

  function handlePlay() {
    setIndex(song.id - 1);
    playSong();
  }

  return (
    <div className="w-[90%] md:w-[60%] bg-gray-800 rounded-lg p-[10px] flex items-center justify-between hover:bg-gray-600 transition-all relative">
      <div
        className="flex justify-start items-center gap-4 w-[70%] cursor-pointer"
        onClick={handlePlay}
      >
        <img
          src={song.image}
          alt={song.name}
          className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-lg object-cover"
        />
        <div className="min-w-0">
          <div className="text-white text-[16px] md:text-[20px] font-semibold truncate">
            {song.name}
          </div>
          <div className="text-gray-200 text-[12px] md:text-[14px] truncate">
            {song.singer}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-white">
        {variant === "playlist" && playlistId ? (
          <button
            className="p-2 rounded-full hover:bg-black/30"
            title="Remove from playlist"
            onClick={() => removeFromPlaylist(playlistId, song.id)}
          >
            <IoClose className="text-[20px]" />
          </button>
        ) : null}

        <button
          className="p-2 rounded-full hover:bg-black/30"
          title={liked ? "Unlike" : "Like"}
          onClick={() => toggleLike(song.id)}
        >
          {liked ? (
            <IoHeart className="text-[20px] text-red-400" />
          ) : (
            <IoHeartOutline className="text-[20px]" />
          )}
        </button>

        <button
          className="p-2 rounded-full hover:bg-black/30"
          title="Add to playlist"
          onClick={() => setShowPicker((p) => !p)}
        >
          <MdOutlinePlaylistAdd className="text-[22px]" />
        </button>
      </div>

      {showPicker ? (
        <div className="absolute right-3 top-[100%] mt-2 z-40 w-[240px] rounded-xl border border-gray-700 bg-gray-900 p-3 shadow-xl">
          <div className="text-white text-[13px] font-semibold">
            Add to playlist
          </div>
          <div className="mt-2 flex gap-2">
            <select
              className="flex-1 rounded-lg bg-gray-800 text-white p-2 text-[13px] outline-none"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
            <button
              className="rounded-lg bg-white text-black px-3 text-[13px] font-semibold hover:bg-gray-200"
              onClick={() => {
                addToPlaylist(selectedPlaylist, song.id);
                setShowPicker(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

