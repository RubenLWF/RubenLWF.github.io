import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();

export interface ColorInfo {
    hex: string;
    isDark: boolean;
}

export const getImageAverageColor = async (imageUrl: string): Promise<ColorInfo> => {
    try {
        const color = await fac.getColorAsync(imageUrl);
        return {
            hex: color.hex,
            isDark: color.isDark
        };
    } catch (error) {
        console.error('Error fetching average color:', error);
        return {
            hex: '#000000',
            isDark: true
        };
    }
};
