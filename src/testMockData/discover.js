const fetchDiscoverErrorData = {};

const fetchDiscoverData = {
    relatedArtist1: [{
        followers: { total: "10" },
        genres: ["alt-rock", "rock"],
        id: "1",
        images: [{ url: "https://arcadefire.com" }],
        name: "arcade fire"
    },
    {
        followers: { total: "20" },
        genres: ["alt-rock", "rock"],
        id: "2",
        images: [{ url: "https://thevaccines.com" }],
        name: "the vaccines"
    }],
    relatedArtist2: [{
        followers: { total: "30" },
        genres: ["alt-rock", "rock"],
        id: "3",
        images: [{ url: "https://bombaybicycleclub.com" }],
        name: "bombay bicycle club"
    },
    {
        followers: { total: "40" },
        genres: ["alt-rock", "rock"],
        id: "4",
        images: [{ url: "https://lunabay.com" }],
        name: "luna bay"
    }],
    userLikedArtists: ["foals", "two door cinema club"]
};

export {
    fetchDiscoverData,
    fetchDiscoverErrorData
};
