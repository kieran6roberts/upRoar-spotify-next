import Image from "next/image";
import Link from "next/link";

const Artist = ({ id, name, image, followers, genre }) => {
    return (
        <Link href={`/dashboard/artists/${id}`} passHref>
            <a>
                <div className="h-60 w-52 max-w-52 overflow-hidden p-8 relative flex flex-col items-center justify-center text-sm text-white font-bold text-center bg-pri opacity-70 transition hover:opacity-100 ">
                    <img
                    src={image}
                    alt="album cover"
                    className="absolute rounded top-0 left-0 right-0 bottom-0"
                    width={208}
                    height={160} />
                    <h2 className="text-md uppercase mb-2 z-10">
                        {name}
                    </h2>
                    <p className="text-sm capitalize z-10">
                        {genre}
                    </p>
                </div>
                <div className="text-xxs text-pink-500 uppercase">
                    followers: {followers}
                </div>
            </a>
        </Link>
    )
};

export default Artist;