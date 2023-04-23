import { Breakpoints } from '@mui/material/styles';

const customBreakpoints: Partial<Breakpoints> = {
    values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
    },
};

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

export default customBreakpoints;
