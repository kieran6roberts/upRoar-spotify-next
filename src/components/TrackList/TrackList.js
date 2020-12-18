import React, { useEffect } from "react";
import Track from "../Track/Track";
import { useUpdatePlaying } from "src/context/PlayingContext";

const TrackList = (spotifyTracks) => {
  const { tracks } = spotifyTracks;
  const { setTracklist } = useUpdatePlaying();

  let image;

  if (spotifyTracks.image) image = spotifyTracks.image;
  
  useEffect(() => {
    const currentTracklist = tracks.map(track => {
      const container = {
        artist: track.artists[0].name,
        trackName: track.name,
        src: track.preview_url
        };
      return container;
      }
    );
    return setTracklist(currentTracklist);
  }, []);

  const mapTracks = tracks.map(track => 
    <li key={track.id}>
      <Track 
      id={track.id}
      trackName={track.name}
      trackImage={track.album ? track.album.images[0].url : image.images[0].url}
      artist={track.artists[0].name}
      album={track.album ? track.album.name : null}
      releaseDate={track.album ? track.album.release_date : null}
      spotifyLink={track.external_urls.spotify}
      audioSrc={track.preview_url} />
    </li>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2">
      {mapTracks}
    </ul>
  )
};

export default React.memo(TrackList);