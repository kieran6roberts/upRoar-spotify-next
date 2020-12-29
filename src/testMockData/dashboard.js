const fetchErrorData = {
    featuredPlaylists: { error: "error" },
    newReleases: { error: "error" },
    token: { error: "error" },
    topTracks: { error: "error" },
    userInfo: { error: "error" }
};

const fetchSuccessfulData = {
    featuredPlaylists: {
        playlists: {
            items: [
                {
                    description: "playlist 1 description",
                    id: "playlist 1",
                    images: [{ url: "https://playlist1.com" }],
                    name: "playlist 1 name"
                },
                {
                    description: "playlist 2 description",
                    id: "playlist 2",
                    images: [{ url: "https://playlist2.com" }],
                    name: "playlist 2 name"
                }
            ]
        }
    },
    newReleases: {
        albums: {
            items: [
                    {
                        artists: [{ name: "artist album 1" }],
                        id: "album 1",
                        images: [{ url: "https://album1.com" }],
                        name: "album 1"
                    },
                    {
                        artists: [{ name: "artist album 2" }],
                        id: "album 2",
                        images: [{ url: "https://album2.com" }],
                        name: "album 2"
                    }
                ]
        }
    },
    token: {
        jwt: "mock jwt"
    },
    topTracks: {
        items: [
            {
                album: {
                    images: [{ url: "https://toptrackalbum1-image.com" }],
                    name: "top track album 1",
                    release_date: "top track album 1 release date"
                },
                artists: [{ name: "top track artist 1" }],
                external_urls: { spotify: "https://toptracktrack1.com" },
                id: "top track track 1",
                name: "top track track 1 name",
                preview_url: "top track preview 1"
            },
            {
                album: {
                    images: [{ url: "https://toptrackalbum2-image.com" }],
                    name: "top track album 2",
                    release_date: "top track album 2 release date"
                },
                artists: [{ name: "top track artist 2" }],
                external_urls: { spotify: "https://toptracktrack2.com" },
                id: "top track 2",
                name: "top track 2 name",
                preview_url: "preview 2"
            }
        ]
    },
    userInfo: {
        id: "user id"
    }
};

const dashboardSearchbarData = {
    results: {
        albums: {
            items: [
                    {
                        artists: [{ name: "foals" }],
                        id: "1",
                        images: [{ url: "https://holyfire.com" }],
                        name: "Holy Fire"
                    },
                    {
                        artists: [{ name: "foals" }],
                        id: "2",
                        images: [{ url: "https://whatwentdown.com" }],
                        name: "What Went Down"
                    }
                ]
        },
        tracks: {
            items: [
                {
                    album: {
                        images: [{ url: "https://foalsalbum1-image.com" }],
                        name: "foals album 1",
                        release_date: "foals album 1 release date"
                    },
                    artists: [{ name: "foals artist 1" }],
                    external_urls: { spotify: "https://foalstrack1.com" },
                    id: "foals track 1",
                    name: "foals track 1 name",
                    preview_url: "foals preview 1"
                },
                {
                    album: {
                        images: [{ url: "https://foalsalbum2-image.com" }],
                        name: "foals album 2",
                        release_date: "foals album 2 release date"
                    },
                    artists: [{ name: "foals artist 2" }],
                    external_urls: { spotify: "https://foalstrack2.com" },
                    id: "foals track 2",
                    name: "foals track 2 name",
                    preview_url: "foals preview 2"
                }
            ]
        }
    }
};

export {
    dashboardSearchbarData,
    fetchErrorData,
    fetchSuccessfulData
};
