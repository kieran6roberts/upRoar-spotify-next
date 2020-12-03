import Link from "next/link";

const Album = ({ name, artist, image, id }) => {
    return (
        <Link href={`/dashboard/albums/${id}`} passHref>
          <a>
            <div className="opacity-50 hover:opacity-80 h-60 w-60 p-8 relative flex flex-col items-center justify-center text-sm text-white font-bold text-center transition ">
                <img
                src={image}
                alt="album cover"
                className="absolute rounded top-0 left-0 right-0 bottom-0"
                width={240}
                height={240} />
                <h2 className="text-md uppercase mb-2 z-10">
                    {artist}
                </h2>
                <p className="text-sm capitalize z-10">
                    {name}
                </p>
            </div>
          </a>
        </Link>
    )
};

export default Album;