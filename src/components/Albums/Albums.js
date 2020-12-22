import React from "react";

import Album from "@/components/Albums/Album/Album";

function Albums (albums) {
  let newReleaseAlbums;

  if (albums.albums) {
    newReleaseAlbums = albums.albums;
  } else {
    newReleaseAlbums = albums.tracks.items;
  }

  return (
    <ul className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {newReleaseAlbums.map((album) => <li
      className="m-auto"
      key={album.id}
                                       >
          <Album
          artist={album.artists[0].name}
          id={album.id}
          image={album.images[0].url}
          name={album.name}
          />
                                       </li>)}
    </ul>
  );
}

export default React.memo(Albums);
