import Track from "../Track/Track";

const TrackList = spotifyTracks => {
  const { tracks } = spotifyTracks;

  const mapTracks = tracks.map(track => 
    <li key={track.id}>
      <Track 
      trackName={track.name}
      trackImage={track.album.images[0].url}
      artist={track.artists[0].name}
      album={track.album.name}
      releaseDate={track.album.release_date}
      spotifyLink={track.external_urls.spotify}
      preview={track.preview_url} />
    </li>
    );
  
    console.log(mapTracks);

  return (
    <ul className="">
      {mapTracks}
    </ul>
  )
};

export default TrackList;