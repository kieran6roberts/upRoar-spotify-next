import Link from "next/link";

function Album ({ name, artist, image, id }) {
  return (
    <Link
    href={`/dashboard/albums/${id}`}
    passHref
    >
      <a className="focus:outline-none focus:ring-2 focus:ring-pink-200">
        <div className="relative flex flex-col items-center justify-center w-56 h-56 p-8 text-sm font-bold text-center text-white transition 2xl:h-80 2xl:w-80 opacity-70 hover:opacity-100">
          <img
          alt="album cover"
          className="absolute top-0 bottom-0 left-0 right-0 rounded"
          height={600}
          src={image}
          width={600}
          />
          <h2 className="z-10 mb-2 text-sm uppercase">
            {artist}
          </h2>
          <p className="z-10 text-xs capitalize">
            {name}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default Album;
