import React, { useEffect } from "react";

import Track from "@/components/Track/Track";
import { useUpdatePlaying } from "@/context/PlayingContext";

function TrackList (spotifyTracks) {
  const { tracks } = spotifyTracks;
  const { setTracklist } = useUpdatePlaying();

  let image;

  if (spotifyTracks.image) {
    const { image: spImage } = spotifyTracks;

    image = spImage;
  }
  console.log(image);

  useEffect(() => {
    const currentTracklist = tracks.map((track) => {
      const container = {
        artist: track.artists[0].name,
        src: track.preview_url,
        trackName: track.name
      };

      return container;
    });

    setTracklist(currentTracklist);
  }, []);

  const mapTracks = tracks.map((track) =>
    <li
    className="w-full m-auto 2xl:w-3/5"
    key={track.id}
    >
      <Track
      album={track.album
        ? track.album.name
        : null}
      artist={track.artists[0].name}
      audioSrc={track.preview_url}
      id={track.id}
      releaseDate={track.album
        ? track.album.release_date
        : null}
      spotifyLink={track.external_urls.spotify}
      trackImage={track.album
        ? track.album.images[0].url
        : image.images[0].url}
      trackName={track.name}
      />
    </li>);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2">
      {mapTracks}
    </ul>
  );
}

export default React.memo(TrackList);
