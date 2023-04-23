import { PaletteOptions } from '@mui/material/styles/createPalette';

const customPalette: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#3EB489',
    },
    content: {
        main: '#000000',
        title: '#faf9f7',
        label: '#6F6E6E',
    },
};

declare module '@mui/material/styles' {
    // including a new palette object as part of your theme
    interface Palette {
        content: Palette['primary'];
    }

    interface PaletteOptions {
        content: PaletteOptions['primary'];
    }

    interface PaletteColor {
        title?: string;
        label?: string;
    }

    interface SimplePaletteColorOptions {
        title?: string;
        label?: string;
    }
}

export default customPalette;
