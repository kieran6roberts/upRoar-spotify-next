import Track from "../Track/Track";

const TrackList = spotifyTracks => {
  const { tracks } = spotifyTracks;
  let image;
  
  if (spotifyTracks.image) image = spotifyTracks.image;

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

export default TrackList;