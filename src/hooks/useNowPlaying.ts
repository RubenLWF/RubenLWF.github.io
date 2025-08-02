import { useState, useEffect } from 'react';
import { getCurrentlyPlaying, type SpotifyTrack } from '../services/spotifyService';
import { getImageAverageColor, type ColorInfo } from '../services/colorService';

export interface NowPlayingData extends SpotifyTrack {
    avgColor?: string;
    isDark?: boolean;
}

export const useNowPlaying = (intervalMs: number = 10000) => {
    const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                setError(null);
                const data = await getCurrentlyPlaying();

                if (data) {
                    // Get the average color from the album image
                    const colorInfo: ColorInfo = await getImageAverageColor(data.albumImageUrl);

                    setNowPlaying({
                        ...data,
                        avgColor: colorInfo.hex,
                        isDark: colorInfo.isDark
                    });
                } else {
                    setNowPlaying(null);
                }
            } catch (err) {
                console.error('Error fetching now playing:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        // Fetch immediately
        fetchNowPlaying();

        // Then set up interval
        const interval = setInterval(fetchNowPlaying, intervalMs);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [intervalMs]);

    return { nowPlaying, loading, error };
};
