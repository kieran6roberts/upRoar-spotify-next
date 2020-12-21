import Link from "next/link";

function Playlists ({ spotifyPlaylists }) {
  if (!spotifyPlaylists.playlists) {
    return <div className="my-4 text-sm capitalize text-txt">no playlists available</div>;
  }

  const { playlists: { items: playlistArr } } = spotifyPlaylists;

  return (
    <ul className="flex flex-col items-center justify-evenly lg:flex-row">
      {playlistArr.map((playlist) =>
      <li
      className="relative flex flex-col items-center justify-center p-8 my-1 text-sm font-bold text-center text-white transition opacity-50 lg:my-0 hover:opacity-90 h-60 w-60 2xl:h-96 2xl:w-96"
      key={playlist.id}
      >
          <Link href={`/dashboard/playlists/${playlist.id}`}>
            <a>
              <img
              alt="playlist cover"
              className="absolute top-0 bottom-0 left-0 right-0 rounded"
              height={700}
              src={playlist.images[0].url}
              width={700}
              />
              <h2 className="z-10 mb-2 uppercase text-md">
                {playlist.name}
              </h2>
              <p className="z-10 hidden text-sm capitalize lg:block">
                {playlist.description}
              </p>
            </a>
          </Link>
      </li>)}
    </ul>
  );
}

export default Playlists;
