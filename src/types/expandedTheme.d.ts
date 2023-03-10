declare module '@mui/material/styles/createPalette' {
    interface Palette {
        neutral: Palette['primary'];
    }

    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }

    interface ButtonPropsVariantOverrides {
        black: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        black: true;
    }
}

export {};
