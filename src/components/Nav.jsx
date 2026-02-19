import React, { useContext, useMemo } from 'react'
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { RiPlayListLine } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { dataContext } from '../context/UserContext';
function Nav() {
  const { likedIds, playlists } = useContext(dataContext);

  const playlistCount = useMemo(() => {
    const active = playlists?.[0];
    return active?.trackIds?.length || 0;
  }, [playlists]);

  return (
    <div className='w-full h-[80px] bg-black fixed bottom-0 md:top-0 text-white flex 
    justify-around
    md:justify-center items-center gap-[50px] p-[20px] z-30 rounded-t-[30px]'>
      <Link to={"/"}>
        <TiHome className='w-[25px] h-[25px]' />
      </Link>
      <Link to={"/search"}>
            <IoSearch  className='w-[25px] h-[25px]'/>
      </Link>
      <Link to={"/playlist"} className="relative">
          <RiPlayListLine className='w-[25px] h-[25px]' />
          {playlistCount ? (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full px-1.5 py-0.5">
              {playlistCount}
            </span>
          ) : null}
         </Link>
      <Link to={"/liked"} className="relative">
          <IoMdHeart  className='w-[25px] h-[25px]'/>
          {likedIds?.size ? (
            <span className="absolute -top-2 -right-2 bg-red-400 text-black text-[10px] font-bold rounded-full px-1.5 py-0.5">
              {likedIds.size}
            </span>
          ) : null}
        </Link>
    </div>
  )
}

export default Nav
