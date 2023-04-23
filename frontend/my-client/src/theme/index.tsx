import { createTheme, ThemeOptions } from '@mui/material';
import customTypography from './typography';
import customPalette from './palettes';
import customBreakpoints from './breakpoints';

const theme: ThemeOptions = createTheme({
    direction: 'rtl',
    typography: customTypography,
    palette: customPalette,
    breakpoints: customBreakpoints,
});

export default theme;
