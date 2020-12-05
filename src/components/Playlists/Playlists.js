import Link from "next/link";

const Playlists = ({ spotifyPlaylists }) => {
    if (!spotifyPlaylists.playlists) {
        return <div className="text-sm text-txt my-4 capitalize">no playlists available</div>
    }

    console.log(spotifyPlaylists);

    const { playlists: { items: playlistArr} } = spotifyPlaylists;
    return (
        <ul className="flex flex-col items-center md:flex-row">
            {playlistArr.map(playlist => 
                <li 
                key={playlist.id}
                className="flex flex-col opacity-50 hover:opacity-90 h-96 w-80 p-8 relative flex flex-col items-center justify-center text-sm text-white font-bold text-center transition" >
                    <Link href={`/dashboard/playlists/${playlist.id}`}>
                        <a>
                            <img
                            src={playlist.images[0].url}
                            alt="playlist cover"
                            className="absolute rounded top-0 left-0 right-0 bottom-0"
                            width={320}
                            height={700} />
                            <h2 className="text-md uppercase mb-2 z-10">
                            {playlist.name}
                            </h2>
                            <p className="hidden lg:block text-sm capitalize z-10">
                                {playlist.description}
                            </p>
                        </a>
                    </Link>
                </li>
            )}
        </ul>
    )
};

export default Playlists;
