import { TypographyOptions } from '@mui/material/styles/createTypography';

const customTypography: TypographyOptions = {
    fontFamily: `'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    title: {
        fontWeight: 700,
        color: '#FFFFFF',
        fontSize: 'max(1.2vw,0.9em)',
    },
};

declare module '@mui/material/styles' {
    interface TypographyVariants {
        title: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        title?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        title: true;
    }
}

export default customTypography;
