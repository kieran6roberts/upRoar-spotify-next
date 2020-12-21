function Card ({ title, icon, text, bgClr }) {
  return (
    <div>
      <div className={`${bgClr} flex justify-center items-center w-24 h-24 m-auto rounded-full `}>
        {icon}
      </div>
      <h3 className="mt-8 text-center capitalize text-md">
        {title}
      </h3>
      <h3 className="mt-4 text-sm text-center uppercase">
        {text}
      </h3>
    </div>
  );
}

export default Card;
