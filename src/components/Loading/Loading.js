const Loading = () => {
  return(
    <div className="flex flex-col items-start justify-center h-screen w-full z-90 p-8 bg-pri bg-opacity-90 absolute top-0 left-0">
      <p className="text-xl text-txt">
        upRoar
      </p>
      <div className="w-2/5 h-1 my-4 bg-gradient-to-r from-purple-400 via-yellow-200 to-pink-400"/>
      <p className="text-lg">
        Loading...
      </p>
    </div>
  )
};

export default Loading;