const VERCEL_API_BASE = import.meta.env.VITE_VERCEL_API_BASE;

const NOW_PLAYING_ENDPOINT = `${VERCEL_API_BASE}/currently-playing`;
const TOKEN_ENDPOINT = `${VERCEL_API_BASE}/token`;

// Token cache
let cachedToken: string | null = null;
let tokenExpiryTime: number = 0;

export interface SpotifyTrack {
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
}

export const getAccessToken = async (): Promise<string> => {
    // Check if we have a valid cached token
    const now = Date.now();
    if (cachedToken && now < tokenExpiryTime) {
        return cachedToken;
    }

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch access token: ${response.status}`);
        }

        const data = await response.json();

        // Cache the token with expiry time (subtract 5 minutes for safety buffer)
        cachedToken = data.access_token;
        const expiresInMs = (data.expires_in - 300) * 1000; // Convert to ms and subtract 5 minutes
        tokenExpiryTime = Date.now() + expiresInMs;

        return cachedToken!;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};

export const getCurrentlyPlaying = async (): Promise<SpotifyTrack | null> => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 204) {
            return null; // Nothing currently playing
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch currently playing: ${response.status}`);
        }

        const song = await response.json();

        if (!song.item || !song.is_playing) {
            return null;
        }

        return {
            albumImageUrl: song.item.album.images[0]?.url || '',
            artist: song.item.artists.map((artist: { name: string }) => artist.name).join(', '),
            isPlaying: song.is_playing,
            songUrl: song.item.external_urls.spotify,
            title: song.item.name
        };
    } catch (error) {
        console.error('Error fetching currently playing track:', error);
        throw error;
    }
};
