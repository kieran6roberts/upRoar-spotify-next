const Loading = () => {
  return(
    <div className="flex items-end justify-start h-screen w-full p-8 bg-gray-900 bg-opacity-90 absolute top-0 left-0">
      <span className="flex items-center justify-center h-16 w-1/4 text-md bg-light-bg">
        Loading...
      </span>
    </div>
  )
};

export default Loading;