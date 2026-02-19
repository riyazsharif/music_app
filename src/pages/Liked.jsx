import React, { useContext } from "react";
import Player from "../components/Player";
import EmptyState from "../components/EmptyState";
import TrackItem from "../components/TrackItem";
import { dataContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Liked() {
  const { likedSongs } = useContext(dataContext);

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center pt-[20px] md:pt-[100px] gap-[20px] pb-[160px]">
      <div className="w-[90%] md:w-[60%] flex items-end justify-between">
        <div>
          <div className="text-white text-[28px] font-bold">Liked Songs</div>
          <div className="text-gray-300 text-[14px]">
            {likedSongs.length} song{likedSongs.length === 1 ? "" : "s"}
          </div>
        </div>
        <Link
          to="/search"
          className="text-black bg-white px-4 py-2 rounded-full text-[13px] font-semibold hover:bg-gray-200"
        >
          Find songs
        </Link>
      </div>

      {likedSongs.length === 0 ? (
        <EmptyState
          title="No liked songs yet"
          subtitle="Tap the heart icon on any track to add it here."
          action={
            <Link
              to="/"
              className="text-black bg-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-gray-200"
            >
              Browse tracks
            </Link>
          }
        />
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          {likedSongs.map((song) => (
            <TrackItem key={song.id} song={song} variant="liked" />
          ))}
        </div>
      )}

      <Player />
    </div>
  );
}

export default Liked;
