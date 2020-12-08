import Album from "src/components/Album/Album";

const Albums =  albums  => {
    let newReleaseAlbums;
    if (albums.albums) newReleaseAlbums = albums.albums;
    else newReleaseAlbums = albums.tracks.items;

    return (
        <ul className="grid gap-x-2 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {newReleaseAlbums.map(album => 
            <li key={album.id} className="m-auto">
                <Album
                id={album.id}
                name={album.name}
                artist={album.artists[0].name}
                image={album.images[0].url} />
            </li>
            )}
        </ul>
    )
};

export default Albums;