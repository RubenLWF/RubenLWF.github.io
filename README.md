# Ruben LWF - Portfolio Website

My personal website built using React, you can visit it on [https://rubenlagerwerf.nl](https://rubenlagerwerf.nl).

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Sass
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **API Proxy**: Vercel Serverless Functions

## 🎵 Spotify Integration

The website features real-time Spotify integration that displays your currently playing track. This is implemented using Vercel's serverless functions as an API proxy and smart token caching to minimize API calls.

## 🎨 Components

### InfoBox
The main component featuring:
- Animated profile section
- Social media links
- Spotify now playing widget

### NowPlaying
Spotify integration component that:
- Fetches current track information
- Displays album artwork with dynamic background colors
- Shows track title, artist, and play status
- Handles loading and error states gracefully

### TechStack
Animated grid showcasing technologies I use:
- Tiles with technology icons
- Flip animation on hover to reveal technology name
