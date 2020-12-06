import Image from "next/image";
import Link from "next/link";

const Artist = ({ id, name, image, followers, genre }) => {
    return (
        <Link href={`/dashboard/artists/${id}`} passHref>
            <a>
                <div className="relative flex flex-col justify-center items-center h-60 w-40">
                    <img
                    src={image}
                    alt="album cover"
                    className="absolute rounded top-0 left-0 right-0 bottom-0"
                    width={240}
                    height={240} />
                    <h2 className="text-md uppercase mb-2 z-10">
                        {name}
                    </h2>
                    <p className="text-sm capitalize z-10">
                        {genre}
                    </p>
                </div>
                <span>
                    {followers}
                </span>
            </a>
        </Link>
    )
};

export default Artist;