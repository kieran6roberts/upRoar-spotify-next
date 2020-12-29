export default function LoadingFetch () {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center hidden w-full h-screen bg-black bg-opacity-40 z-90">
            <div className="flex flex-col items-center justify-center w-1/5 border rounded h-1/5 bg-pri">
                <div>
                    <span className="inline-block w-2 h-2 mx-2 rounded-full bg-txt animate-bounceFirst" />
                    <span className="inline-block w-2 h-2 mx-2 rounded-full bg-txt animate-bounceSecond" />
                    <span className="inline-block w-2 h-2 mx-2 rounded-full bg-txt animate-bounceThird" />
                </div>
                <p className="mt-4 text-sm text-txt">
                    one moment
                </p>
            </div>
        </div>
    );
}