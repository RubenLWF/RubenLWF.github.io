import { useNowPlaying } from '../../hooks/useNowPlaying';
import { FiExternalLink } from "react-icons/fi";
import SpotifyLogo from '../../assets/images/Spotify_Logo.png';

export default function NowPlaying() {
    const { nowPlaying, loading, error } = useNowPlaying(10000);

    if (loading) {
        return (
            <div className="p-4 rounded-4xl shadow-lg w-full max-w-xl bg-gray-200 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-md shadow-lg"></div>
                    <div className="flex-1 min-w-0">
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!nowPlaying?.title || error) {
        return (
            <div
                className="p-4 rounded-4xl flex items-center gap-4 shadow-lg w-full max-w-xl bg-black"
            >
                <img
                    src={SpotifyLogo}
                    alt="Spotify Logo"
                    className="w-24 h-24 rounded-md shadow-lg"
                />
                <div className="flex-1 min-w-0 text-white">
                    <p className="text-lg font-bold truncate">Not Playing</p>
                    <p className="text-sm font-semibold truncate">No music currently playing</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="p-4 rounded-4xl flex items-center gap-4 shadow-lg w-full max-w-xl"
            style={{ backgroundColor: nowPlaying.avgColor }}
        >
            <img
                src={nowPlaying.albumImageUrl}
                alt={nowPlaying.title}
                className="w-24 h-24 rounded-md shadow-lg"
            />
            <div className="flex-1 min-w-0" style={{ color: nowPlaying.isDark ? '#ffffff' : '#000000' }}>
                <p className="text-sm">Currently listening to:</p>
                <p className="text-lg font-bold truncate max-w-[16rem]">{nowPlaying.title}</p>
                <p className="text-sm font-semibold truncate max-w-[16rem]">{nowPlaying.artist}</p>
                <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer" className="flex float-right items-center gap-1 mt-1 text-sm hover:opacity-80 transition-opacity">
                    Listen on Spotify
                    <FiExternalLink size={16} />
                </a>
            </div>
        </div>
    );
}
