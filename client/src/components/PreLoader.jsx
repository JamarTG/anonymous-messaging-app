
export default function PreLoader() {

    return (
        <div className="text-center min-h-screen flex items-center justify-center">
            <div>
            <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border-4 border-green-400 border-t-transparent animate-spin absolute transition delay-200"></div>
                <div className="w-8 h-8 rounded-full border-4 border-green-400 border-t-transparent animate-spin absolute delay-500 "></div>
                <div className="w-12 h-12 rounded-full border-4 border-green-400 border-t-transparent animate-spin absolute delay-1000"></div>
            </div>
            <p className="mt-6 font-2xl text-white">Loading Messages...</p>
            </div>
        </div>
    )
}