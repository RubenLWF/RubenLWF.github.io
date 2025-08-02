const NOW_PLAYING_ENDPOINT = '/api/spotify/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = '/api/spotify/token';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

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

    if (!client_id || !client_secret || !refresh_token) {
        throw new Error('Missing Spotify credentials in environment variables');
    }

    const basic = btoa(`${client_id}:${client_secret}`);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.status}`);
    }

    const data = await response.json();

    // Cache the token with expiry time (subtract 5 minutes for safety buffer)
    cachedToken = data.access_token;
    const expiresInMs = (data.expires_in - 300) * 1000; // Convert to ms and subtract 5 minutes
    tokenExpiryTime = Date.now() + expiresInMs;

    return cachedToken!; // We know it's not null at this point
};

// Function to clear the token cache (useful for testing or when switching accounts)
export const clearTokenCache = (): void => {
    cachedToken = null;
    tokenExpiryTime = 0;
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

        // Handle case where no song is playing
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
