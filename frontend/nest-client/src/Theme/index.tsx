import { createTheme, ThemeOptions } from '@mui/material';
import customTypography from './typography';
import customPalette from './palettes';

const theme: ThemeOptions = createTheme({
    direction: 'rtl',
    typography: customTypography,
    palette: customPalette,
});

export default theme;
