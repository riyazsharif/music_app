import React from "react";
import TrackItem from "./TrackItem";
import { songsData } from "../songs";

function Card({ name, image, singer, songIndex }) {
  const song = songsData[songIndex] || {
    id: songIndex + 1,
    name,
    image,
    singer,
  };

  return <TrackItem song={song} />;
}

export default Card;
