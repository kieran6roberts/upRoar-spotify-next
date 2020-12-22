import Link from "next/link";

function Artist ({ id, name, image, followers, genre }) {
  return (
    <Link
    href={`/dashboard/artists/${id}`}
    passHref
    >
      <a className="">
        <div className="relative flex flex-col items-center justify-center max-w-2xl p-8 m-auto overflow-hidden text-sm font-bold text-center text-white transition h-60 w-52 2xl:h-72 2xl:w-72 bg-pri opacity-70 hover:opacity-100 ">
          <img
          alt="album cover"
          className="absolute top-0 bottom-0 left-0 right-0 rounded"
          height={208}
          src={image}
          width={300}
          />
          <h2 className="z-10 mb-2 uppercase text-md">
            {name}
          </h2>
          <p className="z-10 text-sm capitalize">
            {genre}
          </p>
        </div>
        <div className="text-center text-pink-500 uppercase 2xl:mt-8 text-xxs">
            followers: {followers}
        </div>
      </a>
    </Link>
  );
}

export default Artist;
