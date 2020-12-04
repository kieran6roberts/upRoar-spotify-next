const Playlists = ({ spotifyPlaylists }) => {
    if (!spotifyPlaylists.playlists) {
        return <div className="text-sm text-txt my-4 capitalize">no playlists available</div>
    }

    const { playlists: { items: playlistArr} } = spotifyPlaylists;
    return (
        <ul className="flex">
            {playlistArr.map(playlist => 
                <li className="flex flex-col opacity-50 hover:opacity-90 h-96 w-80 p-8 relative flex flex-col items-center justify-center text-sm text-white font-bold text-center transition" >
                    <img
                    src={playlist.images[0].url}
                    alt="playlist cover"
                    className="absolute rounded top-0 left-0 right-0 bottom-0"
                    width={320}
                    height={700} />
                    <h2 className="text-md uppercase mb-2 z-10">
                    {playlist.name}
                    </h2>
                    <p className="text-sm capitalize z-10">
                        {playlist.description}
                    </p>
                    <button
                    role="link"
                    onClick={() => document.location.href = playlist.external_urls.spotify}
                    className="w-3/5 text-sm text-txt uppercase text-center mt-4 bg-green-500 px-8 my-4 rounded z-20">
                        To spotify
                    </button>
                </li>
            )}
        </ul>
    )
};

export default Playlists;
